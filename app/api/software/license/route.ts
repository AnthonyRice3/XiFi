import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import { SoftwareLicense } from "@/lib/models/SoftwareLicense";

/** GET /api/software/license — returns the user's active software license(s) */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const licenses = await SoftwareLicense.find({ clerkUserId: userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ licenses });
  } catch (err) {
    console.error("[api/software/license GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/software/license — activate the free Starter plan
 * Also used to regenerate the download token for an existing license.
 */
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json() as { action?: "activate_starter" | "refresh_token"; licenseId?: string };

    await connectDB();

    if (body.action === "activate_starter") {
      const existing = await SoftwareLicense.findOne({
        clerkUserId: userId,
        plan: "starter",
        status: { $in: ["active", "trialing"] },
      });
      if (existing) return NextResponse.json({ license: existing });

      const license = await SoftwareLicense.create({
        clerkUserId: userId,
        plan: "starter",
        billingCycle: "lifetime",
        status: "active",
        activatedAt: new Date(),
        downloadToken: crypto.randomBytes(32).toString("hex"),
      });
      return NextResponse.json({ license });
    }

    if (body.action === "refresh_token" && body.licenseId) {
      const license = await SoftwareLicense.findOne({
        _id: body.licenseId,
        clerkUserId: userId,
      });
      if (!license) return NextResponse.json({ error: "License not found" }, { status: 404 });
      license.downloadToken = crypto.randomBytes(32).toString("hex");
      await license.save();
      return NextResponse.json({ license });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("[api/software/license POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
