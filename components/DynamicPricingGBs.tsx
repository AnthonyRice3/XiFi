"use client";

import { useState } from "react";
import { pricing } from "../data/index";

// Define the Plan interface to type your pricing data
interface Plan {
  name: string;
  description: string;
  maxEndpoints: number;
  monthly: number | string;
  yearly: number | string;
  cta: string;
}

export default function DynamicPricingGBs() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [endpoints, setEndpoints] = useState<number>(1);

  // Type the 'plan' parameter as Plan in filter callback
  const displayPlans = pricing.filter((plan: Plan) =>
    plan.name === "Enterprise" ? endpoints > 50 : endpoints <= plan.maxEndpoints
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[550px]">
      <h1 className="text-center pb-8 text-xl text-zinc-600">Choose a package Based on GBs</h1>
      <div className="flex justify-center gap-4 mb-6 bg-gradient-to-br from-black via-stone-950 to-black">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={`px-4 py-2 rounded-full border ${
            billingCycle === "monthly"
              ? "bg-amber-600 text-zinc-100 font-semibold"
              : "bg-white text-black"
          }`}
        >
          Shared
        </button>
        <button
          onClick={() => setBillingCycle("yearly")}
          className={`px-4 py-2 rounded-full border ${
            billingCycle === "yearly"
              ? "bg-amber-600 text-zinc-100 font-semibold"
              : "bg-white text-black"
          }`}
        >
          Dedicated
        </button>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-lg font-medium mb-2 text-white">How many GBs do you need?</h2>
        <label htmlFor="endpoint-slider" className="sr-only">
          Select number of GBs
        </label>
        <input
          id="endpoint-slider"
          type="range"
          min={1}
          max={100}
          color="#FDE68A"
          value={endpoints}
          onChange={(e) => setEndpoints(Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-1 text-sm text-amber-400">GBs: {endpoints}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Also type 'plan' in map */}
        {displayPlans.map((plan: Plan) => (
          <div
            key={plan.name}
            className="border border-amber-500 rounded-2xl p-6 text-white flex flex-col bg-gradient-to-br from-black via-stone-950 to-black"
          >
            <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
            <p className="text-sm text-amber-400 mb-4">{plan.description}</p>

            {typeof plan[billingCycle] === "number" ? (
              <p className="text-2xl font-bold mb-2">
                ${plan[billingCycle]}{" "}
                <span className="text-sm font-medium text-amber-400">
                  / {billingCycle === "monthly" ? "month" : "year"}
                </span>
              </p>
            ) : (
              <p className="text-xl font-bold mb-2">Contact Us</p>
            )}

            <button
              type="button"
              className="mt-auto w-full bg-white text-black font-medium py-2 rounded-xl hover:bg-amber-200"
              onClick={() => {
                console.log(`${plan.name} selected`);
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
