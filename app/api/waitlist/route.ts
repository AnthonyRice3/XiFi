import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Waitlist } from "@/lib/models/Waitlist";
import { resend, FROM_EMAIL } from "@/lib/resend";
import {
  waitlistConfirmationHtml,
  waitlistConfirmationText,
} from "@/lib/emails/waitlist-confirmation";

export async function POST(req: Request) {
  try {
    const { email, name, interest, notes } = await req.json() as {
      email: string;
      name?: string;
      interest?: string;
      notes?: string;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    await connectDB();

    const existing = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: true, alreadyJoined: true });
    }

    await Waitlist.create({
      email: email.toLowerCase(),
      name: name ?? "",
      interest: interest ?? "general",
      notes: notes ?? "",
      source: "/contact",
      status: "pending",
    });

    // Send confirmation email
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "You're on the ProXiFi waitlist 🎉",
        html: waitlistConfirmationHtml({ name, email }),
        text: waitlistConfirmationText({ name, email }),
      });
    } catch (emailErr) {
      console.error("[waitlist] email send failed:", emailErr);
      // Don't fail the signup if email fails
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  // Admin only — used by the admin panel
  try {
    await connectDB();
    const entries = await Waitlist.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ entries });
  } catch (err) {
    console.error("[waitlist] GET", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
