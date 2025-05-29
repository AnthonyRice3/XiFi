"use client";

import React from "react";

export default function ProXiFiHome() {
  return (
    <div className="p-6 space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-semibold">Team Members</h1>
        <p className="mt-2 text-gray-600">
          A team member can authenticate to our proxies.
          It’s useful to create different team members to isolate their data consumption.
          Each team member gets access to unlimited proxies/IPs.
        </p>
        <p className="mt-2 text-gray-600">
          The way our username is designed allows you to manage your proxy configuration without having to use the dashboard.
        </p>
        <p className="mt-2 text-sm text-amber-500">
          This is what a basic username looks like: <code>user_xxxx,type_residential,country_CA,session_randSession01</code>
        </p>
        <p className="mt-2 text-gray-600">
          You can easily change the country code to choose another location. Refer to our{" "}
          <a href="#" className="text-amber-600 underline">Documentation</a> for more.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Team member"
          className="border rounded px-3 py-2 w-full max-w-sm"
        />
        <button className="bg-amber-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
          <span className="font-medium">Team member</span>
          <span className="font-medium">Traffic Usage</span>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-1 rounded text-sm">
            + Create a Team member
          </button>
        </div>

        <div className="flex justify-between items-center px-4 py-4 border-t">
          <div className="flex flex-col">
            <span className="font-mono text-green-700">72bf25</span>
            <span className="text-orange-500 text-sm">⚠ your subscription is expired</span>
            <button className="mt-1 border border-amber-600 text-amber-600 px-2 py-1 rounded text-xs">
              Buy one
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">0 B consumed over this month, no limitation</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
              Get Proxy Details
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
              Disable
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 text-amber-600 mt-4">
        <button>&laquo;</button>
        <button className="bg-amber-600 text-white rounded-full px-3 py-1">1</button>
        <button>&raquo;</button>
      </div>

      <div className="bg-yellow-100 text-center py-4 rounded">
        <p className="text-gray-800">
          <strong>Next step:</strong> purchase a plan to enable your proxy account
          <button className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Purchase a plan
          </button>
        </p>
      </div>
    </div>
  );
}
