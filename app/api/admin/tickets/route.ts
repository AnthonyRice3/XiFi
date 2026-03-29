import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin, isNextResponse } from "@/lib/adminAuth";
import { SupportTicket } from "@/lib/models/SupportTicket";

export async function GET(req: Request) {
  const result = await requireAdmin();
  if (isNextResponse(result)) return result;

  await connectDB();

  const { searchParams } = new URL(req.url);
  const status   = searchParams.get("status");
  const priority = searchParams.get("priority");

  const query: Record<string, string> = {};
  if (status)   query.status = status;
  if (priority) query.priority = priority;

  const tickets = await SupportTicket.find(query).sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ tickets });
}
