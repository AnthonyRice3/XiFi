import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Map our plan identifiers to Stripe Price IDs (set these in your Stripe Dashboard)
const PRICE_MAP: Record<string, string> = {
  proxy_starter:  process.env.STRIPE_PRICE_PROXY_STARTER  as string,
  proxy_growth:   process.env.STRIPE_PRICE_PROXY_GROWTH   as string,
  proxy_standard: process.env.STRIPE_PRICE_PROXY_STANDARD as string,
  proxy_premium:  process.env.STRIPE_PRICE_PROXY_PREMIUM  as string,
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { plan } = await req.json() as { plan: string };
    const priceId = PRICE_MAP[plan];
    if (!priceId) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    await connectDB();

    // Closed beta: only admins/moderators can checkout
    const existingUser = await User.findOne({ clerkUserId: userId }).lean() as { role?: string } | null;
    const role = existingUser?.role ?? "user";
    if (role !== "admin" && role !== "moderator") {
      return NextResponse.json({ error: "Closed beta — join the waitlist at /GetStarted" }, { status: 403 });
    }

    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";

    // Upsert the user record and retrieve or create a Stripe customer
    let user = await User.findOne({ clerkUserId: userId });
    let customerId = user?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({ email, metadata: { clerkUserId: userId } });
      customerId = customer.id;

      if (user) {
        user.stripeCustomerId = customerId;
        await user.save();
      } else {
        user = await User.create({ clerkUserId: userId, email, stripeCustomerId: customerId });
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: { clerkUserId: userId, plan },
      },
      success_url: `${baseUrl}/Dashboard/ProXiFi?success=1`,
      cancel_url:  `${baseUrl}/Dashboard/Plans?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/checkout]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
