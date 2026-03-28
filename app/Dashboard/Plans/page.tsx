"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconCheck, IconLoader2, IconStar } from "@tabler/icons-react";

type PlanId = "proxy_starter" | "proxy_growth" | "proxy_standard" | "proxy_premium";

interface Plan {
  id: PlanId;
  name: string;
  price: number;
  type: "Shared" | "Dedicated";
  users: string;
  data: string;
  apiAccess: string;
  highlight: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: "proxy_starter",
    name: "Starter",
    price: 55,
    type: "Shared",
    users: "1\u20133",
    data: "5GB",
    apiAccess: "Not included",
    highlight: false,
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
    id: "proxy_growth",
    name: "Growth",
    price: 70,
    type: "Shared",
    users: "1\u20132",
    data: "15GB",
    apiAccess: "Not included",
    highlight: false,
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
    id: "proxy_standard",
    name: "Standard",
    price: 90,
    type: "Dedicated",
    users: "1",
    data: "Unlimited",
    apiAccess: "Included",
    highlight: true,
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
    id: "proxy_premium",
    name: "Premium",
    price: 105,
    type: "Dedicated",
    users: "1",
    data: "Unlimited",
    apiAccess: "Included + Priority",
    highlight: false,
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

export default function PlansPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe(planId: PlanId) {
    setLoading(planId);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create checkout session");

      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-zinc-400 text-lg">
            Select a mobile proxy plan. Billed monthly — cancel any time.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-900/40 border border-red-700 p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
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
                ${plan.price}
                <span className="text-sm font-medium text-zinc-400"> /mo</span>
              </p>

              <div className="mt-4 mb-4 text-sm text-zinc-400 space-y-1">
                <div className="flex justify-between">
                  <span>Data</span>
                  <span className="text-white font-semibold">{plan.data}</span>
                </div>
                <div className="flex justify-between">
                  <span>Users</span>
                  <span className="text-white font-semibold">{plan.users}</span>
                </div>
                <div className="flex justify-between">
                  <span>API</span>
                  <span className={`font-semibold ${plan.apiAccess === "Not included" ? "text-zinc-600" : "text-amber-400"}`}>
                    {plan.apiAccess}
                  </span>
                </div>
              </div>

              <div className="border-t border-zinc-800 my-3" />

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
                disabled={loading === plan.id}
                onClick={() => handleSubscribe(plan.id)}
                className={`mt-6 w-full font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 ${
                  plan.highlight
                    ? "bg-amber-600 hover:bg-amber-500 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white"
                }`}
              >
                {loading === plan.id && <IconLoader2 size={16} className="animate-spin" />}
                Subscribe — ${plan.price}/mo
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
