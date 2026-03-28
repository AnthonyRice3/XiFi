"use client";

import { useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";

const PLANS = [
  { name: "Starter", monthly: 55, type: "Shared", users: "1\u20133", data: "5GB", apiAccess: false as boolean | "priority", planKey: "proxy_starter" },
  { name: "Growth",  monthly: 70, type: "Shared", users: "1\u20132", data: "15GB", apiAccess: false as boolean | "priority", planKey: "proxy_growth" },
  { name: "Standard", monthly: 90, type: "Dedicated", users: "1", data: "Unlimited", apiAccess: true as boolean | "priority", planKey: "proxy_standard" },
  { name: "Premium",  monthly: 105, type: "Dedicated", users: "1", data: "Unlimited", apiAccess: "priority" as boolean | "priority", planKey: "proxy_premium" },
];

type DataTier = "5GB" | "15GB" | "Unlimited";
const DATA_TIERS: DataTier[] = ["5GB", "15GB", "Unlimited"];

const tierOrder: Record<DataTier, number> = { "5GB": 0, "15GB": 1, "Unlimited": 2 };
function planTierOrder(data: string): number {
  if (data === "5GB") return 0;
  if (data === "15GB") return 1;
  return 2;
}

export default function DynamicPricingGBs() {
  const [selectedTier, setSelectedTier] = useState<DataTier>("5GB");

  const displayPlans = PLANS.filter((p) => planTierOrder(p.data) >= tierOrder[selectedTier]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[550px]">
      <h1 className="text-center pb-4 text-xl text-zinc-400">Choose a Package Based on Data</h1>
      <p className="text-center text-sm text-zinc-600 mb-8">Select the minimum data you need — plans at or above that tier are shown.</p>

      <div className="flex justify-center gap-3 mb-10">
        {DATA_TIERS.map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className={`px-5 py-2 rounded-full border font-medium transition-colors ${
              selectedTier === tier
                ? "bg-amber-600 border-amber-600 text-white"
                : "bg-transparent border-zinc-700 text-zinc-400 hover:border-amber-500 hover:text-white"
            }`}
          >
            {tier}
          </button>
        ))}
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
                <span>Data</span>
                <span className="font-semibold text-white">{plan.data}</span>
              </div>
              <div className="flex justify-between">
                <span>Users</span>
                <span className="font-semibold text-white">{plan.users}</span>
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
              className="mt-6 w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 rounded-xl transition-colors"
            >
              {plan.planKey === "proxy_starter" || plan.planKey === "proxy_growth" ? "Get Started" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
