import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ role: "user", email: null });

  await connectDB();
  const user = await User.findOne({ clerkUserId: userId }).lean() as { role?: string; email?: string } | null;
  return NextResponse.json({ role: user?.role ?? "user", email: user?.email ?? null });
}
