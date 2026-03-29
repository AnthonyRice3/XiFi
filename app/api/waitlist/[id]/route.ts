import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Waitlist } from "@/lib/models/Waitlist";
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

  if (!["pending", "invited", "converted"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await connectDB();

  const entry = await Waitlist.findByIdAndUpdate(
    id,
    { status, ...(status === "invited" ? { invitedAt: new Date() } : {}) },
    { new: true }
  );

  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ entry });
}
