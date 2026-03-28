import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Stripe Price IDs for software plans — set these in .env.local
// Quarterly (3-month) prices
const SOFTWARE_PRICE_MAP: Record<string, string> = {
  basic_quarterly:     process.env.STRIPE_PRICE_SW_BASIC_QUARTERLY     as string,
  premium_quarterly:   process.env.STRIPE_PRICE_SW_PREMIUM_QUARTERLY   as string,
  business_quarterly:  process.env.STRIPE_PRICE_SW_BUSINESS_QUARTERLY  as string,
  basic_monthly:       process.env.STRIPE_PRICE_SW_BASIC_MONTHLY       as string,
  premium_monthly:     process.env.STRIPE_PRICE_SW_PREMIUM_MONTHLY     as string,
  business_monthly:    process.env.STRIPE_PRICE_SW_BUSINESS_MONTHLY    as string,
  basic_lifetime:      process.env.STRIPE_PRICE_SW_BASIC_LIFETIME      as string,
  premium_lifetime:    process.env.STRIPE_PRICE_SW_PREMIUM_LIFETIME    as string,
  business_lifetime:   process.env.STRIPE_PRICE_SW_BUSINESS_LIFETIME   as string,
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { plan, billingCycle } = await req.json() as { plan: string; billingCycle: string };

    if (plan === "starter") {
      // Free plan — redirect to dashboard to activate immediately
      return NextResponse.json({ free: true, redirect: "/Dashboard/Software" });
    }

    const priceKey = `${plan}_${billingCycle}`;
    const priceId = SOFTWARE_PRICE_MAP[priceKey];
    if (!priceId) return NextResponse.json({ error: "Invalid plan or billing cycle" }, { status: 400 });

    await connectDB();
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";

    const user = await User.findOne({ clerkUserId: userId });
    let customerId = user?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({ email, metadata: { clerkUserId: userId } });
      customerId = customer.id;
      if (user) {
        user.stripeCustomerId = customerId;
        await user.save();
      } else {
        await User.create({ clerkUserId: userId, email, stripeCustomerId: customerId });
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const isLifetime = billingCycle === "lifetime";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: isLifetime ? "payment" : "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      ...(isLifetime
        ? {}
        : {
            subscription_data: {
              metadata: { clerkUserId: userId, plan, billingCycle, productType: "software" },
            },
          }),
      metadata: { clerkUserId: userId, plan, billingCycle, productType: "software" },
      success_url: `${baseUrl}/Dashboard/Software?success=1`,
      cancel_url:  `${baseUrl}/Software?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[api/software/checkout]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
