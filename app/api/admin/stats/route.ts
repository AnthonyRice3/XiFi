import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin, isNextResponse } from "@/lib/adminAuth";
import { User } from "@/lib/models/User";
import { Subscription } from "@/lib/models/Subscription";
import { SupportTicket } from "@/lib/models/SupportTicket";
import { Waitlist } from "@/lib/models/Waitlist";

export async function GET() {
  const result = await requireAdmin();
  if (isNextResponse(result)) return result;

  await connectDB();

  const [
    totalUsers,
    activeSubscriptions,
    canceledSubscriptions,
    openTickets,
    inProgressTickets,
    resolvedTickets,
    recentUsers,
    recentTickets,
    waitlistTotal,
    waitlistPending,
    waitlistInvited,
  ] = await Promise.all([
    User.countDocuments(),
    Subscription.countDocuments({ status: { $in: ["active", "trialing"] } }),
    Subscription.countDocuments({ status: "canceled" }),
    SupportTicket.countDocuments({ status: "open" }),
    SupportTicket.countDocuments({ status: "in_progress" }),
    SupportTicket.countDocuments({ status: { $in: ["resolved", "closed"] } }),
    User.find().sort({ createdAt: -1 }).limit(5).lean(),
    SupportTicket.find().sort({ createdAt: -1 }).limit(5).lean(),
    Waitlist.countDocuments(),
    Waitlist.countDocuments({ status: "pending" }),
    Waitlist.countDocuments({ status: "invited" }),
  ]);

  return NextResponse.json({
    users: {
      total: totalUsers,
    },
    subscriptions: {
      active: activeSubscriptions,
      canceled: canceledSubscriptions,
    },
    tickets: {
      open: openTickets,
      inProgress: inProgressTickets,
      resolved: resolvedTickets,
      total: openTickets + inProgressTickets + resolvedTickets,
    },
    recentUsers,
    recentTickets,
    waitlist: {
      total: waitlistTotal,
      pending: waitlistPending,
      invited: waitlistInvited,
      converted: waitlistTotal - waitlistPending - waitlistInvited,
    },
  });
}
