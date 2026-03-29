"use client";

import { useState } from "react";
import { IconX, IconLoader2, IconCircleCheck, IconCalendar } from "@tabler/icons-react";

const INTERESTS = [
  { value: "proxy_service",  label: "Hosted Proxy Service" },
  { value: "proxy_manager",  label: "Proxy Manager Software" },
  { value: "both",           label: "Both Products" },
  { value: "general",        label: "General Inquiry" },
];

export function BookDemoModal({ onClose }: { onClose: () => void }) {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [company,  setCompany]  = useState("");
  const [interest, setInterest] = useState("both");
  const [message,  setMessage]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, interest, message }),
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <IconX size={20} />
        </button>

        <div className="bg-gradient-to-r from-amber-950/60 to-zinc-900 px-6 py-5 border-b border-zinc-700">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Schedule a Meeting</p>
          <h2 className="text-white text-xl font-extrabold">Book a Demo</h2>
        </div>

        <div className="px-6 py-6">
          {done ? (
            <div className="text-center py-6">
              <IconCircleCheck size={48} className="text-amber-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-bold mb-2">Request Received!</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our team will reach out to <span className="text-amber-400">{email}</span> within 1 business day to schedule your demo.
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                    Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Email <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Interested In
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INTERESTS.map((i) => (
                    <button
                      key={i.value}
                      type="button"
                      onClick={() => setInterest(i.value)}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium text-left transition-colors ${
                        interest === i.value
                          ? "border-amber-500 bg-amber-950/40 text-amber-300"
                          : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                      }`}
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your use case or any questions..."
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
                  : <IconCalendar size={15} />}
                Request Demo
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
