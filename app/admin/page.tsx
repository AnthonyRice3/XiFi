"use client";

import { useEffect, useState, useCallback } from "react";
import {
  IconUsers, IconTicket, IconChartBar, IconRefresh,
  IconCircleCheck, IconClock, IconAlertTriangle, IconX,
  IconChevronDown, IconChevronUp, IconSend, IconShield,
  IconCreditCard, IconLoader2, IconMailFast,
} from "@tabler/icons-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stats {
  users: { total: number };
  subscriptions: { active: number; canceled: number };
  tickets: { open: number; inProgress: number; resolved: number; total: number };
  waitlist: { total: number; pending: number; invited: number; converted: number };
  recentUsers: UserRecord[];
  recentTickets: TicketRecord[];
}

interface WaitlistEntry {
  _id: string;
  email: string;
  name?: string;
  interest: string;
  status: "pending" | "invited" | "converted";
  createdAt: string;
  invitedAt?: string;
}

interface UserRecord {
  _id: string;
  clerkUserId: string;
  email: string;
  role: string;
  createdAt: string;
  subscription?: { plan: string; status: string } | null;
}

interface TicketMessage {
  role: "user" | "moderator";
  authorEmail: string;
  content: string;
  createdAt: string;
}

interface TicketRecord {
  _id: string;
  ticketId: string;
  userEmail: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  open:        "bg-blue-900/40 text-blue-300 border-blue-700",
  in_progress: "bg-amber-900/40 text-amber-300 border-amber-700",
  resolved:    "bg-green-900/40 text-green-300 border-green-700",
  closed:      "bg-zinc-800 text-zinc-400 border-zinc-700",
};

const PRIORITY_COLORS: Record<string, string> = {
  low:    "bg-zinc-800 text-zinc-400",
  medium: "bg-blue-900/40 text-blue-300",
  high:   "bg-orange-900/40 text-orange-300",
  urgent: "bg-red-900/40 text-red-300",
};

const ROLE_COLORS: Record<string, string> = {
  user:      "bg-zinc-800 text-zinc-400",
  moderator: "bg-amber-900/40 text-amber-300",
  admin:     "bg-purple-900/40 text-purple-300",
};

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
      {label}
    </span>
  );
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [tab, setTab] = useState<"overview" | "users" | "tickets" | "waitlist">("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [tickets, setTickets] = useState<TicketRecord[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [waitlistActionId, setWaitlistActionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ticket filter / expanded state
  const [ticketFilter, setTicketFilter] = useState("all");
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [roleUpdating, setRoleUpdating] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, usersRes, ticketsRes, waitlistRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/users"),
        fetch("/api/admin/tickets"),
        fetch("/api/waitlist"),
      ]);
      if (!statsRes.ok || !usersRes.ok || !ticketsRes.ok || !waitlistRes.ok) {
        throw new Error("Access denied or server error");
      }
      const [s, u, t, w] = await Promise.all([statsRes.json(), usersRes.json(), ticketsRes.json(), waitlistRes.json()]);
      setStats(s);
      setUsers(u.users);
      setTickets(t.tickets);
      setWaitlist(w.entries ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  async function updateTicketStatus(id: string, status: string) {
    setStatusUpdating(id);
    await fetch(`/api/admin/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setStatusUpdating(null);
    await loadAll();
  }

  async function sendReply(ticket: TicketRecord) {
    if (!reply.trim()) return;
    setReplyLoading(true);
    await fetch(`/api/admin/tickets/${ticket._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });
    setReply("");
    setReplyLoading(false);
    await loadAll();
  }

  async function updateRole(clerkUserId: string, role: string) {
    setRoleUpdating(clerkUserId);
    await fetch(`/api/admin/users/${clerkUserId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    setRoleUpdating(null);
    await loadAll();
  }

  const filteredTickets = ticketFilter === "all"
    ? tickets
    : tickets.filter((t) => t.status === ticketFilter);

  async function markWaitlistStatus(id: string, status: "invited" | "converted") {
    setWaitlistActionId(id);
    await fetch(`/api/waitlist/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setWaitlistActionId(null);
    await loadAll();
  }

  const INTEREST_LABELS: Record<string, string> = {
    proxy_service:  "Hosted Proxy",
    proxy_manager:  "Proxy Manager",
    both:           "Both",
    general:        "General",
  };

  const WAITLIST_STATUS_COLORS: Record<string, string> = {
    pending:   "bg-amber-900/40 text-amber-300 border-amber-700",
    invited:   "bg-blue-900/40 text-blue-300 border-blue-700",
    converted: "bg-green-900/40 text-green-300 border-green-700",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center gap-3 text-zinc-400">
        <IconLoader2 className="animate-spin" size={22} /> Loading panel...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-400 gap-3">
        <IconAlertTriangle size={22} /> {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-700/40">
            <IconShield className="text-amber-400" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Moderator Panel</h1>
            <p className="text-xs text-zinc-500">ProXiFi Admin Console</p>
          </div>
        </div>
        <button onClick={loadAll} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-colors">
          <IconRefresh size={14} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-800 px-8">
        <div className="flex gap-1">
          {(["overview","users","tickets","waitlist"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-amber-500 text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t === "overview"  && <IconChartBar  className="inline mr-1.5 -mt-0.5" size={14} />}
              {t === "users"     && <IconUsers     className="inline mr-1.5 -mt-0.5" size={14} />}
              {t === "tickets"   && <IconTicket    className="inline mr-1.5 -mt-0.5" size={14} />}
              {t === "waitlist"  && <IconMailFast  className="inline mr-1.5 -mt-0.5" size={14} />}
              {t}
              {t === "tickets" && stats && stats.tickets.open > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">{stats.tickets.open}</span>
              )}
              {t === "waitlist" && (stats?.waitlist?.pending ?? 0) > 0 && (
                <span className="ml-2 bg-amber-600 text-white text-xs rounded-full px-1.5 py-0.5">{stats?.waitlist?.pending}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">

        {/* ── OVERVIEW ───────────────────────────────────────────────── */}
        {tab === "overview" && stats && (
          <div className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Users",     value: stats.users.total,               icon: <IconUsers size={20} className="text-amber-400" />, sub: "registered accounts" },
                { label: "Active Subs",     value: stats.subscriptions.active,       icon: <IconCreditCard size={20} className="text-green-400" />, sub: "paying subscribers" },
                { label: "Open Tickets",    value: stats.tickets.open,               icon: <IconTicket size={20} className="text-red-400" />, sub: "awaiting response" },
                { label: "In Progress",     value: stats.tickets.inProgress,         icon: <IconClock size={20} className="text-blue-400" />, sub: "being handled" },
              ].map((c) => (
                <div key={c.label} className="border border-zinc-800 rounded-2xl p-5 bg-gradient-to-br from-black via-stone-950 to-black">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-zinc-500 uppercase tracking-wide">{c.label}</span>
                    {c.icon}
                  </div>
                  <p className="text-4xl font-extrabold">{c.value}</p>
                  <p className="text-xs text-zinc-600 mt-1">{c.sub}</p>
                </div>
              ))}
            </div>

            {/* Ticket summary row */}
            <div className="border border-zinc-800 rounded-2xl p-5 bg-gradient-to-br from-black via-stone-950 to-black">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Ticket Summary</h2>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Open <strong className="ml-1">{stats.tickets.open}</strong></div>
                <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> In Progress <strong className="ml-1">{stats.tickets.inProgress}</strong></div>
                <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Resolved <strong className="ml-1">{stats.tickets.resolved}</strong></div>
              </div>
            </div>

            {/* Recent sections side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent users */}
              <div className="border border-zinc-800 rounded-2xl p-5 bg-gradient-to-br from-black via-stone-950 to-black">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Recent Users</h2>
                <div className="space-y-3">
                  {stats.recentUsers.map((u) => (
                    <div key={u._id} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-300 truncate">{u.email}</span>
                      <span className="text-zinc-600 text-xs ml-2 shrink-0">{fmt(u.createdAt)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent tickets */}
              <div className="border border-zinc-800 rounded-2xl p-5 bg-gradient-to-br from-black via-stone-950 to-black">
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Recent Tickets</h2>
                <div className="space-y-3">
                  {stats.recentTickets.map((t) => (
                    <div key={t._id} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-300 truncate">{t.subject}</span>
                      <Badge label={t.status.replace("_", " ")} colorClass={`border ${STATUS_COLORS[t.status]}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── USERS ──────────────────────────────────────────────────── */}
        {tab === "users" && (
          <div className="border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-stone-900">
                <tr>
                  {["Email","Role","Plan","Status","Joined","Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id} className={`border-t border-zinc-800 ${i % 2 === 0 ? "bg-black" : "bg-stone-950"}`}>
                    <td className="px-5 py-3 text-zinc-200">{u.email}</td>
                    <td className="px-5 py-3"><Badge label={u.role} colorClass={`border ${ROLE_COLORS[u.role] ?? "bg-zinc-800 text-zinc-400"}`} /></td>
                    <td className="px-5 py-3 text-zinc-400">{u.subscription?.plan ?? "—"}</td>
                    <td className="px-5 py-3">{u.subscription ? <Badge label={u.subscription.status} colorClass={`border ${STATUS_COLORS[u.subscription.status] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"}`} /> : <span className="text-zinc-600 text-xs">none</span>}</td>
                    <td className="px-5 py-3 text-zinc-500 text-xs">{fmt(u.createdAt)}</td>
                    <td className="px-5 py-3">
                      <select
                        value={u.role}
                        disabled={roleUpdating === u.clerkUserId}
                        onChange={(e) => updateRole(u.clerkUserId, e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-lg px-2 py-1 disabled:opacity-50"
                      >
                        <option value="user">user</option>
                        <option value="moderator">moderator</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="text-center py-12 text-zinc-600">No users yet.</div>
            )}
          </div>
        )}

        {/* ── TICKETS ────────────────────────────────────────────────── */}
        {tab === "tickets" && (
          <div className="space-y-4">
            {/* Filter bar */}
            <div className="flex gap-2 flex-wrap">
              {["all","open","in_progress","resolved","closed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTicketFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    ticketFilter === f
                      ? "bg-amber-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {f.replace("_", " ")}
                  {f === "open" && stats && stats.tickets.open > 0 && (
                    <span className="ml-1.5 bg-red-600 text-white text-xs rounded-full px-1.5">{stats.tickets.open}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Ticket list */}
            <div className="space-y-3">
              {filteredTickets.map((ticket) => {
                const isOpen = expandedTicket === ticket._id;
                return (
                  <div key={ticket._id} className="border border-zinc-800 rounded-2xl overflow-hidden bg-gradient-to-br from-black via-stone-950 to-black">
                    {/* Ticket header row */}
                    <button
                      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-zinc-900/40 transition-colors"
                      onClick={() => setExpandedTicket(isOpen ? null : ticket._id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs text-zinc-500 font-mono">{ticket.ticketId}</span>
                          <Badge label={ticket.status.replace("_", " ")} colorClass={`border ${STATUS_COLORS[ticket.status]}`} />
                          <Badge label={ticket.priority} colorClass={`border ${PRIORITY_COLORS[ticket.priority]}`} />
                          <span className="text-xs text-zinc-600 capitalize">{ticket.category}</span>
                        </div>
                        <p className="text-white font-semibold text-sm truncate">{ticket.subject}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{ticket.userEmail} · {fmt(ticket.updatedAt)}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-zinc-600">{ticket.messages.length} msg{ticket.messages.length !== 1 ? "s" : ""}</span>
                        {isOpen ? <IconChevronUp size={16} className="text-zinc-500" /> : <IconChevronDown size={16} className="text-zinc-500" />}
                      </div>
                    </button>

                    {/* Expanded ticket */}
                    {isOpen && (
                      <div className="border-t border-zinc-800 px-5 pb-5">
                        {/* Messages */}
                        <div className="mt-4 space-y-3 max-h-80 overflow-y-auto pr-1">
                          {ticket.messages.map((msg, i) => (
                            <div key={i} className={`flex gap-3 ${msg.role === "moderator" ? "flex-row-reverse" : ""}`}>
                              <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                msg.role === "moderator" ? "bg-amber-900/60 text-amber-300" : "bg-zinc-800 text-zinc-300"
                              }`}>
                                {msg.role === "moderator" ? "M" : "U"}
                              </div>
                              <div className={`rounded-xl px-4 py-2.5 text-sm max-w-[75%] ${
                                msg.role === "moderator"
                                  ? "bg-amber-950/40 border border-amber-800/40 text-amber-100"
                                  : "bg-zinc-800/60 text-zinc-200"
                              }`}>
                                <p>{msg.content}</p>
                                <p className="text-xs text-zinc-500 mt-1">{msg.authorEmail} · {new Date(msg.createdAt).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Actions row */}
                        <div className="mt-4 flex flex-wrap gap-2 items-center">
                          <span className="text-xs text-zinc-500 mr-1">Status:</span>
                          {["open","in_progress","resolved","closed"].map((s) => (
                            <button
                              key={s}
                              disabled={ticket.status === s || statusUpdating === ticket._id}
                              onClick={() => updateTicketStatus(ticket._id, s)}
                              className={`text-xs px-3 py-1 rounded-full border transition-colors disabled:opacity-40 ${
                                ticket.status === s
                                  ? `${STATUS_COLORS[s]} cursor-default`
                                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                              }`}
                            >
                              {s.replace("_", " ")}
                            </button>
                          ))}
                          {statusUpdating === ticket._id && <IconLoader2 size={14} className="animate-spin text-zinc-500" />}
                        </div>

                        {/* Reply box */}
                        {ticket.status !== "closed" && (
                          <div className="mt-4 flex gap-3">
                            <textarea
                              rows={3}
                              placeholder="Type your reply..."
                              value={expandedTicket === ticket._id ? reply : ""}
                              onChange={(e) => setReply(e.target.value)}
                              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-amber-600"
                            />
                            <button
                              onClick={() => sendReply(ticket)}
                              disabled={replyLoading || !reply.trim()}
                              className="self-end flex items-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                            >
                              {replyLoading ? <IconLoader2 size={14} className="animate-spin" /> : <IconSend size={14} />}
                              Reply
                            </button>
                          </div>
                        )}
                        {ticket.status === "closed" && (
                          <p className="mt-3 text-xs text-zinc-600 flex items-center gap-1"><IconX size={12} /> This ticket is closed.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {filteredTickets.length === 0 && (
                <div className="text-center py-12 text-zinc-600 flex flex-col items-center gap-2">
                  <IconCircleCheck size={32} className="text-zinc-800" />
                  No tickets in this filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── WAITLIST ───────────────────────────────────────────────── */}
        {tab === "waitlist" && (
          <div className="space-y-6">
            {/* Stats row */}
            {stats?.waitlist && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total",     value: stats.waitlist.total,     color: "text-white" },
                  { label: "Pending",   value: stats.waitlist.pending,   color: "text-amber-400" },
                  { label: "Invited",   value: stats.waitlist.invited,   color: "text-blue-400" },
                  { label: "Converted", value: stats.waitlist.converted, color: "text-green-400" },
                ].map((c) => (
                  <div key={c.label} className="border border-zinc-800 rounded-2xl p-5 bg-gradient-to-br from-black via-stone-950 to-black">
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">{c.label}</p>
                    <p className={`text-4xl font-extrabold ${c.color}`}>{c.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Table */}
            <div className="border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-2">
                <IconMailFast size={16} className="text-amber-400" />
                <h2 className="text-sm font-semibold text-zinc-300">Waitlist Entries</h2>
                <span className="ml-auto text-xs text-zinc-600">{waitlist.length} total</span>
              </div>
              {waitlist.length === 0 ? (
                <div className="text-center py-12 text-zinc-600">No entries yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 text-left">
                        <th className="px-4 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Email</th>
                        <th className="px-4 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Name</th>
                        <th className="px-4 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Interest</th>
                        <th className="px-4 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Status</th>
                        <th className="px-4 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Joined</th>
                        <th className="px-4 py-3 text-xs text-zinc-500 uppercase tracking-wide font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waitlist.map((entry) => (
                        <tr key={entry._id} className="border-b border-zinc-800/60 hover:bg-zinc-900/40 transition-colors">
                          <td className="px-4 py-3 text-zinc-300">{entry.email}</td>
                          <td className="px-4 py-3 text-zinc-400">{entry.name || <span className="text-zinc-700 italic">—</span>}</td>
                          <td className="px-4 py-3 text-zinc-400">{INTEREST_LABELS[entry.interest] ?? entry.interest}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${WAITLIST_STATUS_COLORS[entry.status]}`}>
                              {entry.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-zinc-600 text-xs">{fmt(entry.createdAt)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              {entry.status === "pending" && (
                                <button
                                  onClick={() => markWaitlistStatus(entry._id, "invited")}
                                  disabled={waitlistActionId === entry._id}
                                  className="text-xs px-3 py-1 rounded-lg bg-blue-900/40 border border-blue-700/50 text-blue-300 hover:bg-blue-800/50 transition-colors disabled:opacity-50"
                                >
                                  {waitlistActionId === entry._id ? "..." : "Mark Invited"}
                                </button>
                              )}
                              {entry.status === "invited" && (
                                <button
                                  onClick={() => markWaitlistStatus(entry._id, "converted")}
                                  disabled={waitlistActionId === entry._id}
                                  className="text-xs px-3 py-1 rounded-lg bg-green-900/40 border border-green-700/50 text-green-300 hover:bg-green-800/50 transition-colors disabled:opacity-50"
                                >
                                  {waitlistActionId === entry._id ? "..." : "Mark Converted"}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
