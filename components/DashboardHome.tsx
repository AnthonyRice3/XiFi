"use client";

import React from "react";

export const DashboardHome = () => {
  return (
    <div className="space-y-6 px-6 py-4 w-screen h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="bg-amber-600 text-white text-sm px-4 py-2 rounded-full hover:bg-amber-700 transition">
            Contact support
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-4 items-center">
        <button className="bg-amber-700 text-white px-4 py-1 rounded-full text-sm font-medium">
          Top 10 domains traffic
        </button>
        <select title="/" className="border rounded-md px-3 py-1 text-sm">
          <option>Team member</option>
          <option>All</option>
        </select>
        <select title="/" className="border rounded-md px-3 py-1 text-sm">
          <option>Interval</option>
          <option>Last 24 hours</option>
        </select>
        <button className="bg-amber-700 text-white px-4 py-1 rounded-full text-sm font-medium">
          Export
        </button>
      </div>

      {/* Traffic Overview */}
      <div className="rounded-lg bg-gray-50 border p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-amber-700 mb-2">Traffic Overview</h2>
        <div className="text-center text-sm mb-2">
          0 B consumed over the last 24 hours
        </div>
        <div className="flex justify-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <span className="w-4 h-2 bg-green-500 inline-block" /> <span className="text-xs">Data Consumption</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-2 bg-amber-700 inline-block" /> <span className="text-xs">Requests</span>
          </div>
        </div>
        <div className="h-40 border bg-white rounded-sm" />
        <p className="text-sm text-gray-600 mt-2">
          You can choose to limit quota to a specific proxy account in the{" "}
          <span className="text-amber-700 underline">Proxy accounts</span> section.
        </p>
      </div>

      {/* Top 10 Domains */}
      <div className="rounded-lg bg-gray-50 border p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-amber-700 mb-2">Top 10 domains</h2>
        <div className="flex justify-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <span className="w-4 h-2 bg-green-500 inline-block" /> <span className="text-xs">Data Consumption</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-2 bg-amber-700 inline-block" /> <span className="text-xs">Request Count</span>
          </div>
        </div>
        <div className="h-40 border bg-white rounded-sm" />
        <footer className="text-xs text-center text-gray-500 mt-4">
          Copyright © anyIP.io 2025
        </footer>
      </div>
    </div>
  );
};