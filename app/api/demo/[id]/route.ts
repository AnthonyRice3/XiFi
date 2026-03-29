import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { DemoBooking } from "@/lib/models/DemoBooking";
import { requireAdmin, isNextResponse } from "@/lib/adminAuth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  if (!["pending", "scheduled", "completed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await connectDB();
  const booking = await DemoBooking.findByIdAndUpdate(
    id,
    { status },
    { returnDocument: "after" }
  );

  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ booking });
}
