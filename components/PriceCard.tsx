"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { IconCheck, IconStar, IconLoader2 } from "@tabler/icons-react";
import { useUserRole } from "@/lib/useUserRole";

const PLANS = [
  {
    name: "Starter",
    monthly: 55,
    type: "Shared",
    users: "1\u20133",
    data: "5GB",
    apiAccess: false as boolean | "priority",
    highlight: false,
    planKey: "proxy_starter",
    features: [
      "Shared mobile proxy",
      "5GB monthly data",
      "1\u20133 simultaneous users",
      "Auto IP rotation",
      "HTTP & SOCKS5 support",
      "Email support",
    ],
  },
  {
    name: "Growth",
    monthly: 70,
    type: "Shared",
    users: "1\u20132",
    data: "15GB",
    apiAccess: false as boolean | "priority",
    highlight: false,
    planKey: "proxy_growth",
    features: [
      "Shared mobile proxy",
      "15GB monthly data",
      "1\u20132 simultaneous users",
      "Auto IP rotation",
      "HTTP & SOCKS5 support",
      "Email support",
    ],
  },
  {
    name: "Standard",
    monthly: 90,
    type: "Dedicated",
    users: "1",
    data: "Unlimited",
    apiAccess: true as boolean | "priority",
    highlight: true,
    planKey: "proxy_standard",
    features: [
      "Dedicated mobile proxy",
      "Unlimited data",
      "1 exclusive user",
      "Auto IP rotation",
      "HTTP & SOCKS5 support",
      "API access included",
      "Priority email support",
    ],
  },
  {
    name: "Premium",
    monthly: 105,
    type: "Dedicated",
    users: "1",
    data: "Unlimited",
    apiAccess: "priority" as boolean | "priority",
    highlight: false,
    planKey: "proxy_premium",
    features: [
      "Dedicated mobile proxy",
      "Unlimited data",
      "1 exclusive user",
      "Auto IP rotation",
      "HTTP & SOCKS5 support",
      "Priority API access",
      "24/7 priority support",
    ],
  },
];

export default function PriceCard() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { isAdmin } = useUserRole();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(planKey: string) {
    if (!isSignedIn || !isAdmin) {
      router.push("/GetStarted");
      return;
    }
    setLoading(planKey);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      router.push(data.url);
    } catch {
      setLoading(null);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-center text-3xl font-bold text-white mb-2">Mobile Proxy Plans</h2>
      <p className="text-center text-zinc-400 mb-10">Flexible plans for every use case. No hidden fees.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-6 flex flex-col ${
              plan.highlight
                ? "border-2 border-amber-500 bg-gradient-to-br from-amber-950/30 via-stone-950 to-black"
                : "border border-zinc-800 bg-gradient-to-br from-black via-stone-950 to-black"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                <IconStar size={12} /> Most Popular
              </span>
            )}

            <span
              className={`text-xs font-semibold uppercase tracking-wide mb-3 px-2 py-1 rounded-full w-fit ${
                plan.type === "Shared"
                  ? "bg-zinc-800 text-zinc-300"
                  : "bg-amber-900/60 text-amber-300"
              }`}
            >
              {plan.type}
            </span>

            <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
            <p className="text-4xl font-extrabold text-amber-400 mt-2">
              ${plan.monthly}
              <span className="text-sm font-medium text-zinc-400"> /mo</span>
            </p>

            <div className="my-5 border-t border-zinc-800" />

            <ul className="space-y-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                  <IconCheck size={16} className="text-amber-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              type="button"
              disabled={loading === plan.planKey}
              onClick={() => handleCheckout(plan.planKey)}
              className={`mt-6 w-full font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 ${
                plan.highlight
                  ? "bg-amber-600 hover:bg-amber-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700 text-white"
              }`}
            >
              {loading === plan.planKey && <IconLoader2 size={16} className="animate-spin" />}
              Get Started — ${plan.monthly}/mo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
