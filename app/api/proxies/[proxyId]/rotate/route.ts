import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Proxy } from "@/lib/models/Proxy";
import { rotateProxy } from "@/lib/proxyManager";

/** POST /api/proxies/[proxyId]/rotate – request a new IP for a mobile proxy */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ proxyId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { proxyId } = await params;

    await connectDB();
    const proxy = await Proxy.findOne({ _id: proxyId, clerkUserId: userId });

    if (!proxy) return NextResponse.json({ error: "Proxy not found" }, { status: 404 });
    if (proxy.status !== "active") {
      return NextResponse.json({ error: "Proxy is not active" }, { status: 400 });
    }

    proxy.status = "rotating";
    await proxy.save();

    const newIp = await rotateProxy(proxy.deviceId ?? proxy._id.toString());

    proxy.status = "active";
    proxy.lastRotatedAt = new Date();
    await proxy.save();

    return NextResponse.json({ success: true, newIp });
  } catch (err) {
    console.error("[api/proxies/rotate]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
