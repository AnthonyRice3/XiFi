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
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[clerk-webhook] CLERK_WEBHOOK_SECRET not set");
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
    console.error("[clerk-webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  await connectDB();

  const { type, data } = event;

  if (type === "user.created") {
    const primary = data.email_addresses.find(
      (e) => e.id === data.primary_email_address_id
    );
    const email = primary?.email_address ?? data.email_addresses[0]?.email_address ?? "";

    try {
      await User.findOneAndUpdate(
        { clerkUserId: data.id },
        { clerkUserId: data.id, email, role: "user" },
        { upsert: true, new: true }
      );
      console.log(`[clerk-webhook] user.created → synced ${email}`);
    } catch (err) {
      console.error("[clerk-webhook] user.created DB error:", err);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  if (type === "user.updated") {
    const primary = data.email_addresses.find(
      (e) => e.id === data.primary_email_address_id
    );
    const email = primary?.email_address ?? data.email_addresses[0]?.email_address;
    if (email) {
      await User.findOneAndUpdate({ clerkUserId: data.id }, { email });
    }
  }

  if (type === "user.deleted") {
    await User.deleteOne({ clerkUserId: data.id });
    console.log(`[clerk-webhook] user.deleted → removed ${data.id}`);
  }

  return NextResponse.json({ received: true });
}
