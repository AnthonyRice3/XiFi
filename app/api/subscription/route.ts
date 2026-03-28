import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Subscription } from "@/lib/models/Subscription";

/** GET /api/subscription – returns the current active subscription (if any) */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const subscription = await Subscription.findOne({
      clerkUserId: userId,
      status: { $in: ["active", "trialing", "past_due"] },
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ subscription: subscription ?? null });
  } catch (err) {
    console.error("[api/subscription]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
