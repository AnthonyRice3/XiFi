import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin, isNextResponse } from "@/lib/adminAuth";
import { SupportTicket } from "@/lib/models/SupportTicket";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const result = await requireAdmin();
  if (isNextResponse(result)) return result;

  const { ticketId } = await params;
  await connectDB();

  const ticket = await SupportTicket.findById(ticketId).lean();
  if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ticket });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const result = await requireAdmin();
  if (isNextResponse(result)) return result;
  const { userId } = result;

  const { ticketId } = await params;
  const body = await req.json() as {
    status?: string;
    priority?: string;
    assignedTo?: string;
    reply?: string;
  };

  await connectDB();

  const ticket = await SupportTicket.findById(ticketId);
  if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (body.status   && ["open","in_progress","resolved","closed"].includes(body.status))  ticket.status = body.status as typeof ticket.status;
  if (body.priority && ["low","medium","high","urgent"].includes(body.priority)) ticket.priority = body.priority as typeof ticket.priority;
  if (body.assignedTo !== undefined) ticket.assignedTo = body.assignedTo;

  if (body.reply?.trim()) {
    const clerkUser = await currentUser();
    const { userId: authId } = await auth();
    ticket.messages.push({
      role: "moderator",
      authorId: authId ?? userId,
      authorEmail: clerkUser?.emailAddresses[0]?.emailAddress ?? "moderator",
      content: body.reply.trim(),
      createdAt: new Date(),
    });
    // Auto-move to in_progress when a moderator first replies
    if (ticket.status === "open") ticket.status = "in_progress";
  }

  await ticket.save();
  return NextResponse.json({ ticket });
}
