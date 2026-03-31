"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { IconCheck, IconX, IconLoader2 } from "@tabler/icons-react";
import { useUserRole } from "@/lib/useUserRole";

const PLANS = [
  { name: "Starter",  monthly: 55,  type: "Shared",    users: "1\u20133", maxUsers: 3, data: "5GB",       apiAccess: false as boolean | "priority", planKey: "proxy_starter" },
  { name: "Growth",   monthly: 70,  type: "Shared",    users: "1\u20132", maxUsers: 2, data: "15GB",      apiAccess: false as boolean | "priority", planKey: "proxy_growth" },
  { name: "Standard", monthly: 90,  type: "Dedicated", users: "1",        maxUsers: 1, data: "Unlimited", apiAccess: true as boolean | "priority", planKey: "proxy_standard" },
  { name: "Premium",  monthly: 105, type: "Dedicated", users: "1",        maxUsers: 1, data: "Unlimited", apiAccess: "priority" as boolean | "priority", planKey: "proxy_premium" },
];

export default function DynamicPricingEndpoints() {
  const [userCount, setUserCount] = useState<number>(1);
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { isAdmin } = useUserRole();
  const [loading, setLoading] = useState<string | null>(null);

  const displayPlans = PLANS.filter((p) => p.maxUsers >= userCount);

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
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[550px]">
      <h1 className="text-center pb-4 text-xl text-zinc-400">Choose a Package Based on Users</h1>
      <p className="text-center text-sm text-zinc-600 mb-6">Slide to select how many users need simultaneous access.</p>

      <div className="text-center mb-10">
        <label htmlFor="user-slider" className="sr-only">Select number of users</label>
        <input
          id="user-slider"
          type="range"
          min={1}
          max={3}
          value={userCount}
          onChange={(e) => setUserCount(Number(e.target.value))}
          className="w-48 accent-amber-500"
        />
        <div className="mt-2 text-sm text-amber-400 font-semibold">
          {userCount} {userCount === 1 ? "User" : "Users"}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayPlans.map((plan) => (
          <div
            key={plan.name}
            className="border border-amber-500/40 rounded-2xl p-6 text-white flex flex-col bg-gradient-to-br from-black via-stone-950 to-black"
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wide mb-3 px-2 py-1 rounded-full w-fit ${
                plan.type === "Shared"
                  ? "bg-zinc-800 text-zinc-300"
                  : "bg-amber-900/60 text-amber-300"
              }`}
            >
              {plan.type}
            </span>
            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
            <p className="text-3xl font-extrabold text-amber-400 mt-2 mb-1">
              ${plan.monthly}
              <span className="text-sm font-medium text-zinc-400"> /mo</span>
            </p>

            <div className="mt-4 space-y-2 text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>Users</span>
                <span className="font-semibold text-white">{plan.users}</span>
              </div>
              <div className="flex justify-between">
                <span>Data</span>
                <span className="font-semibold text-white">{plan.data}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API Access</span>
                {plan.apiAccess === "priority" ? (
                  <span className="text-amber-400 font-semibold text-xs">Priority</span>
                ) : plan.apiAccess ? (
                  <IconCheck size={16} className="text-amber-400" />
                ) : (
                  <IconX size={16} className="text-zinc-600" />
                )}
              </div>
            </div>

            <button
              type="button"
              disabled={loading === plan.planKey}
              onClick={() => handleCheckout(plan.planKey)}
              className="mt-6 w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
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
