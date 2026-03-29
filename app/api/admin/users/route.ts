import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin, isNextResponse } from "@/lib/adminAuth";
import { User } from "@/lib/models/User";
import { Subscription } from "@/lib/models/Subscription";

export async function GET() {
  const result = await requireAdmin();
  if (isNextResponse(result)) return result;

  await connectDB();

  const users = await User.find().sort({ createdAt: -1 }).lean();

  // Attach latest subscription to each user
  const withSubs = await Promise.all(
    users.map(async (u) => {
      const sub = await Subscription.findOne({ clerkUserId: u.clerkUserId })
        .sort({ createdAt: -1 })
        .lean();
      return { ...u, subscription: sub ?? null };
    })
  );

  return NextResponse.json({ users: withSubs });
}
