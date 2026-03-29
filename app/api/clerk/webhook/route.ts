import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export const runtime = "nodejs";

type ClerkEmailAddress = { email_address: string; id: string };

interface ClerkUserEvent {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    email_addresses: ClerkEmailAddress[];
    primary_email_address_id: string;
    deleted?: boolean;
  };
}

export async function POST(req: Request) {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("[clerk-webhook] CLERK_WEBHOOK_SECRET env var is not set in this environment");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    // Read raw body and verify signature
    const rawBody = await req.text();
    const svixId        = req.headers.get("svix-id") ?? "";
    const svixTimestamp = req.headers.get("svix-timestamp") ?? "";
    const svixSignature = req.headers.get("svix-signature") ?? "";

    let event: ClerkUserEvent;
    try {
      const wh = new Webhook(webhookSecret);
      event = wh.verify(rawBody, {
        "svix-id":        svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as ClerkUserEvent;
    } catch (err) {
      console.error("[clerk-webhook] signature verification failed — check CLERK_WEBHOOK_SECRET matches the Clerk dashboard signing secret:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
      await connectDB();
    } catch (err) {
      console.error("[clerk-webhook] MongoDB connection failed — check MONGODB_URI in Vercel env vars:", err);
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }

    const { type, data } = event;
    console.log(`[clerk-webhook] received event: ${type} for user ${data.id}`);

    if (type === "user.created") {
      const primary = data.email_addresses.find(
        (e) => e.id === data.primary_email_address_id
      );
      const email = primary?.email_address ?? data.email_addresses[0]?.email_address ?? "";
      await User.findOneAndUpdate(
        { clerkUserId: data.id },
        { clerkUserId: data.id, email, role: "user" },
        { upsert: true, returnDocument: "after" }
      );
      console.log(`[clerk-webhook] user.created → synced ${email}`);
    }

    if (type === "user.updated") {
      const primary = data.email_addresses.find(
        (e) => e.id === data.primary_email_address_id
      );
      const email = primary?.email_address ?? data.email_addresses[0]?.email_address;
      if (email) {
        await User.findOneAndUpdate({ clerkUserId: data.id }, { email });
        console.log(`[clerk-webhook] user.updated → ${email}`);
      }
    }

    if (type === "user.deleted") {
      await User.deleteOne({ clerkUserId: data.id });
      console.log(`[clerk-webhook] user.deleted → removed ${data.id}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[clerk-webhook] unhandled error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
