"use client";

import { useEffect, useState, useCallback } from "react";
import {
  IconPlus, IconTicket, IconSend, IconChevronDown, IconChevronUp,
  IconCircleCheck, IconClock, IconLoader2, IconAlertTriangle, IconX,
} from "@tabler/icons-react";

interface TicketMessage {
  role: "user" | "moderator";
  authorEmail: string;
  content: string;
  createdAt: string;
}

interface Ticket {
  _id: string;
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  open:        "bg-blue-900/40 text-blue-300 border-blue-700",
  in_progress: "bg-amber-900/40 text-amber-300 border-amber-700",
  resolved:    "bg-green-900/40 text-green-300 border-green-700",
  closed:      "bg-zinc-800 text-zinc-400 border-zinc-700",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  open:        <IconClock size={13} />,
  in_progress: <IconClock size={13} />,
  resolved:    <IconCircleCheck size={13} />,
  closed:      <IconX size={13} />,
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SupportPage() {
  const [view, setView] = useState<"list" | "new">("list");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New ticket form
  const [form, setForm] = useState({
    subject: "",
    category: "technical",
    priority: "medium",
    message: "",
  });

  const loadTickets = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/support/tickets");
    if (res.ok) {
      const data = await res.json();
      setTickets(data.tickets);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadTickets(); }, [loadTickets]);

  async function submitTicket() {
    if (!form.subject.trim() || !form.message.trim()) {
      setError("Subject and message are required.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const res = await fetch("/api/support/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ subject: "", category: "technical", priority: "medium", message: "" });
      setView("list");
      await loadTickets();
    } else {
      const d = await res.json();
      setError(d.error ?? "Failed to submit ticket.");
    }
    setSubmitting(false);
  }

  async function sendReply(ticket: Ticket) {
    if (!reply.trim()) return;
    setReplyLoading(true);
    const res = await fetch(`/api/support/tickets/${ticket._id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: reply }),
    });
    if (res.ok) {
      setReply("");
      await loadTickets();
    }
    setReplyLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Support</h1>
            <p className="text-zinc-400 text-sm mt-1">Submit a ticket — our team typically responds within 24 hours.</p>
          </div>
          <button
            onClick={() => { setView(view === "new" ? "list" : "new"); setError(null); }}
            className={`flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-xl transition-colors ${
              view === "new"
                ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                : "bg-amber-600 hover:bg-amber-500 text-white"
            }`}
          >
            {view === "new" ? <IconX size={16} /> : <IconPlus size={16} />}
            {view === "new" ? "Cancel" : "New Ticket"}
          </button>
        </div>

        {/* ── New Ticket Form ─────────────────────────────────────── */}
        {view === "new" && (
          <div className="border border-zinc-800 rounded-2xl p-6 bg-gradient-to-br from-black via-stone-950 to-black mb-8">
            <h2 className="text-lg font-semibold mb-5">Open a New Ticket</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-wide mb-1 block">Subject</label>
                <input
                  type="text"
                  placeholder="Brief description of your issue"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wide mb-1 block">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-600"
                  >
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="account">Account</option>
                    <option value="proxy">Proxy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wide mb-1 block">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-600"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-wide mb-1 block">Message</label>
                <textarea
                  rows={5}
                  placeholder="Describe your issue in detail..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-amber-600"
                />
              </div>
              {error && <p className="text-red-400 text-sm flex items-center gap-1"><IconAlertTriangle size={14} />{error}</p>}
              <button
                onClick={submitTicket}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {submitting ? <IconLoader2 size={16} className="animate-spin" /> : <IconSend size={16} />}
                {submitting ? "Submitting..." : "Submit Ticket"}
              </button>
            </div>
          </div>
        )}

        {/* ── Ticket List ─────────────────────────────────────────── */}
        {loading ? (
          <div className="flex items-center gap-3 text-zinc-400 py-12 justify-center">
            <IconLoader2 className="animate-spin" size={18} /> Loading tickets...
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-16 border border-zinc-800 rounded-2xl bg-gradient-to-br from-black via-stone-950 to-black">
            <IconTicket size={40} className="text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-400 font-medium">No tickets yet</p>
            <p className="text-zinc-600 text-sm mt-1">Click &quot;New Ticket&quot; to get help from our team.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => {
              const isExpanded = expanded === ticket._id;
              const lastMsg = ticket.messages[ticket.messages.length - 1];
              return (
                <div key={ticket._id} className="border border-zinc-800 rounded-2xl overflow-hidden bg-gradient-to-br from-black via-stone-950 to-black">
                  <button
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-zinc-900/40 transition-colors"
                    onClick={() => setExpanded(isExpanded ? null : ticket._id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-zinc-500">{ticket.ticketId}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${STATUS_COLORS[ticket.status]}`}>
                          {STATUS_ICONS[ticket.status]} {ticket.status.replace("_", " ")}
                        </span>
                        <span className="text-xs text-zinc-600 capitalize">{ticket.category}</span>
                      </div>
                      <p className="text-white font-semibold text-sm">{ticket.subject}</p>
                      {lastMsg && (
                        <p className="text-xs text-zinc-600 mt-0.5 truncate">
                          {lastMsg.role === "moderator" ? "Support: " : "You: "}{lastMsg.content}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-xs text-zinc-600">{fmt(ticket.updatedAt)}</span>
                      {isExpanded ? <IconChevronUp size={14} className="text-zinc-600" /> : <IconChevronDown size={14} className="text-zinc-600" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-zinc-800 px-5 pb-5">
                      {/* Messages */}
                      <div className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                        {ticket.messages.map((msg, i) => (
                          <div key={i} className={`flex gap-3 ${msg.role === "moderator" ? "flex-row-reverse" : ""}`}>
                            <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              msg.role === "moderator" ? "bg-amber-900/60 text-amber-300" : "bg-zinc-800 text-zinc-300"
                            }`}>
                              {msg.role === "moderator" ? "S" : "Y"}
                            </div>
                            <div className={`rounded-xl px-4 py-2.5 text-sm max-w-[80%] ${
                              msg.role === "moderator"
                                ? "bg-amber-950/40 border border-amber-800/40 text-amber-100"
                                : "bg-zinc-800/60 text-zinc-200"
                            }`}>
                              <p>{msg.content}</p>
                              <p className="text-xs text-zinc-500 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Reply input */}
                      {ticket.status !== "closed" ? (
                        <div className="mt-4 flex gap-3">
                          <textarea
                            rows={3}
                            placeholder="Add a reply..."
                            value={expanded === ticket._id ? reply : ""}
                            onChange={(e) => setReply(e.target.value)}
                            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-amber-600"
                          />
                          <button
                            onClick={() => sendReply(ticket)}
                            disabled={replyLoading || !reply.trim()}
                            className="self-end flex items-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                          >
                            {replyLoading ? <IconLoader2 size={14} className="animate-spin" /> : <IconSend size={14} />}
                            Send
                          </button>
                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-zinc-600 flex items-center gap-1"><IconX size={12} /> This ticket is closed.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
