import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SupportTicket } from "@/lib/models/SupportTicket";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const tickets = await SupportTicket.find({ clerkUserId: userId }).sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";

  const { subject, category, priority, message } = await req.json() as {
    subject: string;
    category: string;
    priority?: string;
    message: string;
  };

  if (!subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
  }

  await connectDB();

  const ticket = await SupportTicket.create({
    clerkUserId: userId,
    userEmail: email,
    subject: subject.trim(),
    category: category ?? "other",
    priority: priority ?? "medium",
    status: "open",
    messages: [
      {
        role: "user",
        authorId: userId,
        authorEmail: email,
        content: message.trim(),
        createdAt: new Date(),
      },
    ],
  });

  return NextResponse.json({ ticket }, { status: 201 });
}
