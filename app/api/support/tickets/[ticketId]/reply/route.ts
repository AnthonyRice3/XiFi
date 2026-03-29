import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SupportTicket } from "@/lib/models/SupportTicket";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ticketId } = await params;
  const { message } = await req.json() as { message: string };

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  await connectDB();

  const ticket = await SupportTicket.findById(ticketId);
  if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (ticket.clerkUserId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (ticket.status === "closed") return NextResponse.json({ error: "Ticket is closed" }, { status: 400 });

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";

  ticket.messages.push({
    role: "user",
    authorId: userId,
    authorEmail: email,
    content: message.trim(),
    createdAt: new Date(),
  });

  // Reopen if resolved so moderator sees it
  if (ticket.status === "resolved") ticket.status = "open";

  await ticket.save();
  return NextResponse.json({ ticket });
}
