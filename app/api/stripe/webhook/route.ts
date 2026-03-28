import { NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import { Subscription } from "@/lib/models/Subscription";
import { Proxy } from "@/lib/models/Proxy";
import { SoftwareLicense } from "@/lib/models/SoftwareLicense";
import { provisionProxy, deprovisionProxy } from "@/lib/proxyManager";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const runtime = "nodejs";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  await connectDB();

  switch (event.type) {

    // ── Checkout completed (lifetime software purchase) ──────────────────────
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.productType !== "software") break;
      if (session.metadata?.billingCycle !== "lifetime") break;
      const clerkUserId = session.metadata.clerkUserId;
      const plan = session.metadata.plan as "basic" | "premium" | "business";
      if (!clerkUserId || !plan) break;
      await SoftwareLicense.findOneAndUpdate(
        { clerkUserId, plan, billingCycle: "lifetime" },
        {
          clerkUserId,
          plan,
          billingCycle: "lifetime",
          status: "active",
          stripeCustomerId: session.customer as string,
          activatedAt: new Date(),
          downloadToken: crypto.randomBytes(32).toString("hex"),
        },
        { upsert: true, new: true }
      );
      break;
    }

    // ── Subscription created ─────────────────────────────────────────────────
    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Subscription;
      const clerkUserId = sub.metadata?.clerkUserId;
      if (!clerkUserId) break;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subAny = sub as any;

      if (sub.metadata?.productType === "software") {
        const swPlan = (sub.metadata?.plan ?? "basic") as "basic" | "premium" | "business";
        const billingCycle = (sub.metadata?.billingCycle ?? "monthly") as "monthly" | "quarterly";
        await SoftwareLicense.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          {
            clerkUserId,
            plan: swPlan,
            billingCycle,
            status: sub.status === "active" ? "active" : "trialing",
            stripeSubscriptionId: sub.id,
            stripeCustomerId: sub.customer as string,
            stripePriceId: sub.items.data[0].price.id,
            activatedAt: new Date(),
            expiresAt: new Date(subAny.current_period_end * 1_000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            downloadToken: crypto.randomBytes(32).toString("hex"),
          },
          { upsert: true, new: true }
        );
        break;
      }

      // Proxy subscription
      const plan = (sub.metadata?.plan ?? "shared_mobile") as "shared_mobile" | "dedicated_mobile";
      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: sub.id },
        {
          clerkUserId,
          stripeSubscriptionId: sub.id,
          stripeCustomerId: sub.customer as string,
          stripePriceId: sub.items.data[0].price.id,
          plan,
          status: sub.status as string,
          currentPeriodStart: new Date(subAny.current_period_start * 1_000),
          currentPeriodEnd: new Date(subAny.current_period_end * 1_000),
          cancelAtPeriodEnd: sub.cancel_at_period_end,
        },
        { upsert: true, new: true }
      );
      try {
        const existingCount = await Proxy.countDocuments({ clerkUserId });
        const provisioned = await provisionProxy(plan, existingCount);
        await Proxy.create({
          clerkUserId,
          subscriptionId: sub.id,
          type: plan,
          label: `${plan === "dedicated_mobile" ? "Dedicated" : "Shared"} Mobile Proxy #${existingCount + 1}`,
          host: provisioned.host,
          httpPort: provisioned.httpPort,
          socks5Port: provisioned.socks5Port,
          username: provisioned.username,
          password: provisioned.password,
          country: provisioned.country,
          carrier: provisioned.carrier,
          isp: provisioned.isp,
          status: "active",
          deviceId: provisioned.deviceId,
          expiresAt: new Date(subAny.current_period_end * 1_000),
        });
      } catch (e) {
        console.error("[webhook] proxy provisioning failed:", e);
      }
      break;
    }

    // ── Subscription updated ─────────────────────────────────────────────────
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subAny2 = sub as any;

      if (sub.metadata?.productType === "software") {
        await SoftwareLicense.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          {
            status: sub.status === "active" ? "active" : (sub.status as string),
            expiresAt: new Date(subAny2.current_period_end * 1_000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          }
        );
      } else {
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          {
            status: sub.status as string,
            currentPeriodStart: new Date(subAny2.current_period_start * 1_000),
            currentPeriodEnd: new Date(subAny2.current_period_end * 1_000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          }
        );
        await Proxy.updateMany(
          { subscriptionId: sub.id },
          { expiresAt: new Date(subAny2.current_period_end * 1_000), status: "active" }
        );
      }
      break;
    }

    // ── Subscription deleted / canceled ──────────────────────────────────────
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;

      if (sub.metadata?.productType === "software") {
        await SoftwareLicense.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          { status: "canceled" }
        );
      } else {
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          { status: "canceled" }
        );
        const proxies = await Proxy.find({ subscriptionId: sub.id });
        for (const proxy of proxies) {
          if (proxy.deviceId) {
            try { await deprovisionProxy(proxy.deviceId); } catch { /* continue */ }
          }
          proxy.status = "inactive";
          await proxy.save();
        }
      }
      break;
    }

    // ── Invoice payment failed ────────────────────────────────────────────────
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const invAny = invoice as any;
      const rawSub = invAny.subscription ?? invAny.parent?.subscription_details?.subscription;
      const subId: string | undefined = typeof rawSub === "string" ? rawSub : rawSub?.id;
      if (subId) {
        await Subscription.findOneAndUpdate({ stripeSubscriptionId: subId }, { status: "past_due" });
        await Proxy.updateMany({ subscriptionId: subId }, { status: "inactive" });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
