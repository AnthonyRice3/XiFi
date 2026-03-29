import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin, isNextResponse } from "@/lib/adminAuth";
import { User } from "@/lib/models/User";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const result = await requireAdmin("admin");
  if (isNextResponse(result)) return result;

  const { userId } = await params;
  const { role } = await req.json() as { role: string };

  if (!["user", "moderator", "admin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOneAndUpdate(
    { clerkUserId: userId },
    { role },
    { new: true }
  ).lean();

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ user });
}
