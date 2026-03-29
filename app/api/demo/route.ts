import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { DemoBooking } from "@/lib/models/DemoBooking";

export async function POST(req: Request) {
  try {
    const { name, email, company, interest, message } = await req.json() as {
      name: string;
      email: string;
      company?: string;
      interest?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    await connectDB();
    await DemoBooking.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company?.trim(),
      interest: interest ?? "general",
      message: message?.trim(),
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[demo] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await DemoBooking.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("[demo] GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
