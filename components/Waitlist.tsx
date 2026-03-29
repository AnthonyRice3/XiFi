"use client";

import { useState } from "react";
import { IconX, IconMail, IconUser, IconLoader2, IconCircleCheck, IconChevronRight } from "@tabler/icons-react";

const INTERESTS = [
  { value: "proxy_service",  label: "Hosted Proxy Service" },
  { value: "proxy_manager",  label: "Proxy Manager Software" },
  { value: "both",           label: "Both" },
  { value: "general",        label: "Just keeping tabs" },
];

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [interest, setInterest] = useState("proxy_service");
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);
  const [error, setError]       = useState("");
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      if (data.alreadyJoined) setAlreadyJoined(true);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <IconX size={20} />
        </button>

        {/* Header strip */}
        <div className="bg-gradient-to-r from-amber-950/60 to-zinc-900 px-6 py-5 border-b border-zinc-700">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Early Access</p>
          <h2 className="text-white text-xl font-extrabold">Join the ProXiFi Waitlist</h2>
        </div>

        <div className="px-6 py-6">
          {done ? (
            <div className="text-center py-4">
              <IconCircleCheck size={48} className="text-amber-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-bold mb-2">
                {alreadyJoined ? "Already on the list!" : "You're in!"}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {alreadyJoined
                  ? "This email is already on our waitlist. We will be in touch soon."
                  : `We sent a confirmation to ${email}. We will reach out when your early access spot opens.`}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Name
                </label>
                <div className="relative">
                  <IconUser size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  Email <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <IconMail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5">
                  I am interested in
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

              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <IconLoader2 size={16} className="animate-spin" /> : null}
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WaitlistSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <WaitlistModal onClose={() => setOpen(false)} />}

      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-amber-600/30 bg-gradient-to-br from-amber-950/20 via-zinc-900 to-black p-10 text-center">
            {/* Decorative glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
            <span className="relative inline-block mb-3 px-3 py-1 rounded-full border border-amber-600/50 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Early Access
            </span>
            <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
              Be First in Line
            </h2>
            <p className="relative text-zinc-400 text-base max-w-lg mx-auto mb-8 leading-relaxed">
              Join the ProXiFi waitlist and get early access to mobile proxies, priority onboarding, and early-bird pricing before we open to the public.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="relative inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors"
            >
              Join the Waitlist <IconChevronRight size={16} />
            </button>
            <p className="relative mt-4 text-zinc-600 text-xs">No spam. We will email you when your spot opens.</p>
          </div>
        </div>
      </section>
    </>
  );
}
