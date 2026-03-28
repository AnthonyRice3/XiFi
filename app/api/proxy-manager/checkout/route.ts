import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(_req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const priceId = process.env.STRIPE_PRICE_PROXY_MANAGER as string;
    if (!priceId) return NextResponse.json({ error: "Product not configured" }, { status: 500 });

    await connectDB();

    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";

    // Upsert user + Stripe customer
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
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      payment_intent_data: {
        metadata: { clerkUserId: userId, productType: "proxy_manager_software" },
      },
      success_url: `${baseUrl}/proxy-manager?success=1`,
      cancel_url: `${baseUrl}/proxy-manager?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[proxy-manager/checkout]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
