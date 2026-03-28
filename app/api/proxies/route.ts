import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Proxy } from "@/lib/models/Proxy";

/** GET /api/proxies – returns all proxies for the authenticated user */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const proxies = await Proxy.find({ clerkUserId: userId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ proxies });
  } catch (err) {
    console.error("[api/proxies]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
