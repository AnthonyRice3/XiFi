"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  IconRefresh,
  IconCopy,
  IconCheck,
  IconLoader2,
  IconWifi,
  IconDeviceMobile,
  IconAlertCircle,
  IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";

interface Proxy {
  _id: string;
  label: string;
  type: "shared_mobile" | "dedicated_mobile";
  host: string;
  httpPort: number;
  socks5Port: number;
  username: string;
  password: string;
  country: string;
  carrier: string;
  isp: string;
  status: "active" | "inactive" | "rotating";
  lastRotatedAt?: string;
  expiresAt: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button onClick={copy} className="ml-2 text-zinc-500 hover:text-amber-400 transition-colors">
      {copied ? <IconCheck className="w-4 h-4 text-green-400" /> : <IconCopy className="w-4 h-4" />}
    </button>
  );
}

function StatusBadge({ status }: { status: Proxy["status"] }) {
  const map = {
    active:   "bg-green-900/40 text-green-400 border-green-700",
    inactive: "bg-zinc-800 text-zinc-400 border-zinc-700",
    rotating: "bg-amber-900/40 text-amber-400 border-amber-700",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${map[status]}`}>
      {status === "rotating" ? "Rotating..." : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function ProXiFiHome() {
  const [proxies, setProxies] = useState<Proxy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rotatingId, setRotatingId] = useState<string | null>(null);
  const [rotateMsg, setRotateMsg] = useState<{ id: string; msg: string } | null>(null);

  const fetchProxies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/proxies");
      if (!res.ok) throw new Error("Failed to load proxies");
      const data = await res.json();
      setProxies(data.proxies ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProxies(); }, [fetchProxies]);

  async function handleRotate(proxyId: string) {
    setRotatingId(proxyId);
    setRotateMsg(null);
    try {
      const res = await fetch(`/api/proxies/${proxyId}/rotate`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Rotation failed");
      setRotateMsg({ id: proxyId, msg: data.newIp ? `New IP: ${data.newIp}` : "IP rotated successfully" });
      await fetchProxies();
    } catch (e) {
      setRotateMsg({ id: proxyId, msg: e instanceof Error ? e.message : "Error" });
    } finally {
      setRotatingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-400">
        <IconLoader2 className="w-6 h-6 animate-spin mr-2" /> Loading proxies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-400 flex items-center gap-2">
        <IconAlertCircle /> {error}
      </div>
    );
  }

  if (proxies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-zinc-400">
        <IconDeviceMobile className="w-12 h-12 text-zinc-600" />
        <p className="text-lg font-semibold text-zinc-300">No active proxies</p>
        <p className="text-sm text-center max-w-xs">
          You have not subscribed to a mobile proxy plan yet. Choose a plan to get started.
        </p>
        <Link
          href="/Dashboard/Plans"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
        >
          <IconShoppingCart className="w-4 h-4" /> View Plans
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Proxies</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your mobile proxy connections</p>
        </div>
        <button
          onClick={fetchProxies}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-all"
        >
          <IconRefresh className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="space-y-4">
        {proxies.map((proxy) => (
          <div
            key={proxy._id}
            className="bg-gradient-to-br from-zinc-900 via-stone-950 to-black border border-zinc-800 rounded-2xl p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {proxy.type === "dedicated_mobile" ? (
                  <IconDeviceMobile className="w-5 h-5 text-amber-400" />
                ) : (
                  <IconWifi className="w-5 h-5 text-amber-400" />
                )}
                <div>
                  <h2 className="text-white font-semibold">{proxy.label}</h2>
                  <p className="text-zinc-500 text-xs">{proxy.carrier} · {proxy.country} · {proxy.isp}</p>
                </div>
              </div>
              <StatusBadge status={proxy.status} />
            </div>

            {/* Credentials grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-5">
              {[
                { label: "Host",         value: proxy.host },
                { label: "HTTP Port",    value: proxy.httpPort.toString() },
                { label: "SOCKS5 Port",  value: proxy.socks5Port.toString() },
                { label: "Username",     value: proxy.username },
                { label: "Password",     value: proxy.password },
              ].map(({ label, value }) => (
                <div key={label} className="bg-black/40 rounded-lg px-3 py-2 flex items-center justify-between">
                  <span className="text-zinc-500 mr-3 min-w-[90px]">{label}</span>
                  <div className="flex items-center overflow-hidden">
                    <code className="text-zinc-200 font-mono text-xs truncate">{value}</code>
                    <CopyButton text={value} />
                  </div>
                </div>
              ))}

              {/* Full connection string */}
              <div className="sm:col-span-2 bg-black/40 rounded-lg px-3 py-2 flex items-center justify-between">
                <span className="text-zinc-500 mr-3 min-w-[90px]">HTTP String</span>
                <div className="flex items-center overflow-hidden">
                  <code className="text-zinc-200 font-mono text-xs truncate">
                    {`http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.httpPort}`}
                  </code>
                  <CopyButton text={`http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.httpPort}`} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-zinc-600">
                {proxy.lastRotatedAt
                  ? `Last rotated: ${new Date(proxy.lastRotatedAt).toLocaleString()}`
                  : "Never rotated"
                }
                {" · "}
                Expires: {new Date(proxy.expiresAt).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2">
                {rotateMsg?.id === proxy._id && (
                  <span className="text-xs text-green-400">{rotateMsg.msg}</span>
                )}
                <button
                  onClick={() => handleRotate(proxy._id)}
                  disabled={proxy.status !== "active" || rotatingId === proxy._id}
                  className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-700/50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {rotatingId === proxy._id ? (
                    <IconLoader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <IconRefresh className="w-3.5 h-3.5" />
                  )}
                  Rotate IP
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
