"use client";

import React from "react";
import { IconCheck, IconX } from "@tabler/icons-react";

type CellValue = string | boolean;

const FEATURES: { label: string; starter: CellValue; growth: CellValue; standard: CellValue; premium: CellValue }[] = [
  { label: "Monthly Price",        starter: "$55",       growth: "$70",      standard: "$90",        premium: "$105"       },
  { label: "Proxy Type",           starter: "Shared",    growth: "Shared",   standard: "Dedicated",  premium: "Dedicated"  },
  { label: "Simultaneous Users",   starter: "1\u20133",  growth: "1\u20132", standard: "1",          premium: "1"          },
  { label: "Monthly Data",         starter: "5GB",       growth: "15GB",     standard: "Unlimited",  premium: "Unlimited"  },
  { label: "HTTP & SOCKS5",        starter: true,        growth: true,       standard: true,         premium: true         },
  { label: "Auto IP Rotation",     starter: true,        growth: true,       standard: true,         premium: true         },
  { label: "Dashboard Access",     starter: true,        growth: true,       standard: true,         premium: true         },
  { label: "API Access",           starter: false,       growth: false,      standard: true,         premium: true         },
  { label: "Priority API Access",  starter: false,       growth: false,      standard: false,        premium: true         },
  { label: "Priority Support",     starter: false,       growth: false,      standard: false,        premium: true         },
];

function Cell({ value }: { value: CellValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <IconCheck size={18} className="text-amber-400 mx-auto" />
    ) : (
      <IconX size={18} className="text-zinc-700 mx-auto" />
    );
  }
  return <span className="text-white font-medium">{value}</span>;
}

const Spreadsheet: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      <h2 className="text-center text-3xl font-bold text-white mb-2">Plan Comparison</h2>
      <p className="text-center text-zinc-400 mb-8">See exactly what each plan includes.</p>

      <div className="rounded-xl overflow-hidden border border-zinc-800">
        <table className="w-full text-sm text-center">
          <thead>
            <tr className="bg-stone-900">
              <th className="px-6 py-4 text-left text-amber-500 uppercase text-xs tracking-wide font-semibold">Feature</th>
              <th className="px-6 py-4 text-amber-500 uppercase text-xs tracking-wide font-semibold">Starter</th>
              <th className="px-6 py-4 text-amber-500 uppercase text-xs tracking-wide font-semibold">Growth</th>
              <th className="px-6 py-4 text-amber-400 uppercase text-xs tracking-wide font-semibold bg-amber-950/30">Standard</th>
              <th className="px-6 py-4 text-amber-500 uppercase text-xs tracking-wide font-semibold">Premium</th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((row, i) => (
              <tr key={row.label} className={`border-t border-zinc-800 ${i % 2 === 0 ? "bg-black" : "bg-stone-950"}`}>
                <td className="px-6 py-3 text-left font-medium text-zinc-300 whitespace-nowrap">{row.label}</td>
                <td className="px-6 py-3 text-zinc-400"><Cell value={row.starter} /></td>
                <td className="px-6 py-3 text-zinc-400"><Cell value={row.growth} /></td>
                <td className="px-6 py-3 text-zinc-400 bg-amber-950/20"><Cell value={row.standard} /></td>
                <td className="px-6 py-3 text-zinc-400"><Cell value={row.premium} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
