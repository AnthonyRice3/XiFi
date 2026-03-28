"use client";

import { useEffect, useState } from "react";
import {
  IconCreditCard,
  IconLoader2,
  IconAlertCircle,
  IconCalendar,
  IconCircleCheck,
  IconDeviceMobile,
  IconWifi,
} from "@tabler/icons-react";

interface Subscription {
  _id: string;
  plan: "shared_mobile" | "dedicated_mobile";
  status: "active" | "past_due" | "trialing" | "incomplete";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

const PLAN_LABELS: Record<string, string> = {
  shared_mobile: "Shared Mobile Proxy",
  dedicated_mobile: "Dedicated Mobile Proxy",
};

const STATUS_STYLES: Record<string, string> = {
  active:     "bg-green-900/40 text-green-400 border-green-700",
  trialing:   "bg-blue-900/40 text-blue-400 border-blue-700",
  past_due:   "bg-red-900/40 text-red-400 border-red-700",
  incomplete: "bg-zinc-800 text-zinc-400 border-zinc-700",
};

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/subscription")
      .then((r) => r.json())
      .then((d) => setSubscription(d.subscription))
      .catch(() => setError("Failed to load subscription"))
      .finally(() => setLoading(false));
  }, []);

  async function openBillingPortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to open billing portal");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setPortalLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-400">
        <IconLoader2 className="w-6 h-6 animate-spin mr-2" /> Loading billing…
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Billing</h1>
        <p className="text-zinc-400 mt-1 text-sm">Manage your subscription and payment method.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-900/40 border border-red-700 p-4 text-red-300 text-sm flex items-center gap-2">
          <IconAlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {subscription ? (
        <div className="bg-gradient-to-br from-zinc-900 via-stone-950 to-black border border-zinc-800 rounded-2xl p-6 space-y-5">
          {/* Plan header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {subscription.plan === "dedicated_mobile" ? (
                <IconDeviceMobile className="w-6 h-6 text-amber-400" />
              ) : (
                <IconWifi className="w-6 h-6 text-amber-400" />
              )}
              <div>
                <h2 className="text-white font-semibold text-lg">
                  {PLAN_LABELS[subscription.plan]}
                </h2>
                <p className="text-zinc-500 text-xs">Monthly subscription</p>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${
                STATUS_STYLES[subscription.status] ?? STATUS_STYLES.incomplete
              }`}
            >
              {subscription.status.replace("_", " ")}
            </span>
          </div>

          <div className="border-t border-zinc-800" />

          {/* Period */}
          <div className="flex items-center gap-3 text-sm">
            <IconCalendar className="w-4 h-4 text-zinc-500" />
            <span className="text-zinc-400">Current period</span>
            <span className="text-zinc-200 ml-auto">
              {new Date(subscription.currentPeriodStart).toLocaleDateString()} –{" "}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </span>
          </div>

          {/* Renewal / cancel notice */}
          <div className="flex items-center gap-3 text-sm">
            <IconCircleCheck className="w-4 h-4 text-zinc-500" />
            <span className="text-zinc-400">
              {subscription.cancelAtPeriodEnd
                ? "Cancels at end of period"
                : `Renews on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`}
            </span>
          </div>

          <div className="border-t border-zinc-800" />

          {/* Portal button */}
          <button
            onClick={openBillingPortal}
            disabled={portalLoading}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-3 rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {portalLoading ? (
              <><IconLoader2 className="w-4 h-4 animate-spin" /> Opening portal…</>
            ) : (
              <><IconCreditCard className="w-4 h-4" /> Manage Subscription & Payments</>
            )}
          </button>
          <p className="text-xs text-zinc-600 text-center">
            You&apos;ll be redirected to the Stripe billing portal to update your payment method, download invoices, or cancel.
          </p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-zinc-900 via-stone-950 to-black border border-zinc-800 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
          <IconCreditCard className="w-12 h-12 text-zinc-600" />
          <h2 className="text-zinc-300 font-semibold text-lg">No active subscription</h2>
          <p className="text-zinc-500 text-sm max-w-sm">
            You don&apos;t have an active proxy subscription yet. Head to Plans to get started.
          </p>
          <a
            href="/Dashboard/Plans"
            className="mt-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
          >
            View Plans
          </a>
        </div>
      )}
    </div>
  );
}
