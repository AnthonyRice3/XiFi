import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export type AdminRole = "moderator" | "admin";

/**
 * Call at the top of any admin API route.
 * Returns { userId } if the user has moderator or admin role, or a 401/403 NextResponse.
 */
export async function requireAdmin(
  minRole: AdminRole = "moderator"
): Promise<{ userId: string } | NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findOne({ clerkUserId: userId }).lean();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const roleRank: Record<string, number> = { user: 0, moderator: 1, admin: 2 };
  const required = roleRank[minRole] ?? 1;
  const actual   = roleRank[(user as { role?: string }).role ?? "user"] ?? 0;

  if (actual < required) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return { userId };
}

export function isNextResponse(val: unknown): val is NextResponse {
  return val instanceof NextResponse;
}
