"use client";

import { useState } from "react";
import { IconX, IconLoader2, IconCircleCheck, IconSend } from "@tabler/icons-react";

const CATEGORIES = [
  { value: "billing",   label: "Billing" },
  { value: "technical", label: "Technical" },
  { value: "account",   label: "Account" },
  { value: "other",     label: "Other" },
];

const PRIORITIES = [
  { value: "low",    label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high",   label: "High" },
  { value: "urgent", label: "Urgent" },
];

export function SupportTicketModal({ onClose }: { onClose: () => void }) {
  const [subject,  setSubject]  = useState("");
  const [category, setCategory] = useState("technical");
  const [priority, setPriority] = useState("medium");
  const [message,  setMessage]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, category, priority, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <IconX size={20} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950/60 to-zinc-900 px-6 py-5 border-b border-zinc-700">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Support</p>
          <h2 className="text-white text-xl font-extrabold">Submit a Support Ticket</h2>
        </div>

        <div className="px-6 py-6">
          {done ? (
            <div className="text-center py-6">
              <IconCircleCheck size={48} className="text-amber-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-bold mb-2">Ticket Submitted!</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our team will review your ticket and get back to you shortly. You can track it under{" "}
                <span className="text-amber-400">Dashboard → Support</span>.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Subject <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Briefly describe your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Category + Priority row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Message <span className="text-amber-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your issue in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading
                  ? <IconLoader2 size={16} className="animate-spin" />
                  : <IconSend size={15} />}
                Submit Ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
