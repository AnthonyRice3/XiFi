"use client";

import { useEffect, useState, useCallback } from "react";
import {
  IconLoader2, IconKey, IconDownload, IconRefresh, IconCalendar,
  IconDeviceMobile, IconAlertCircle, IconShoppingCart, IconCopy, IconCheck,
} from "@tabler/icons-react";
import Link from "next/link";

const PLAN_LABELS: Record<string, string> = {
  starter: "Starter (Free)",
  basic: "Basic",
  premium: "Premium",
  business: "Business",
};

const STATUS_STYLES: Record<string, string> = {
  active:     "bg-green-900/40 text-green-400 border-green-700",
  trialing:   "bg-blue-900/40 text-blue-400 border-blue-700",
  expired:    "bg-zinc-800 text-zinc-400 border-zinc-700",
  canceled:   "bg-red-900/40 text-red-400 border-red-700",
};

interface License {
  _id: string;
  plan: string;
  billingCycle: string;
  status: string;
  licenseKey: string;
  activatedAt?: string;
  expiresAt?: string;
  downloadToken?: string;
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

export default function SoftwareLicensePage() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);
  const [refreshingId, setRefreshingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLicenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/software/license");
      if (!res.ok) throw new Error("Failed to load licenses");
      const data = await res.json();
      setLicenses(data.licenses ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLicenses(); }, [fetchLicenses]);

  async function activateStarter() {
    setActivating(true);
    setError(null);
    try {
      const res = await fetch("/api/software/license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "activate_starter" }),
      });
      if (!res.ok) throw new Error("Activation failed");
      await fetchLicenses();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setActivating(false);
    }
  }

  async function refreshToken(licenseId: string) {
    setRefreshingId(licenseId);
    setError(null);
    try {
      const res = await fetch("/api/software/license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "refresh_token", licenseId }),
      });
      if (!res.ok) throw new Error("Failed to refresh download token");
      await fetchLicenses();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setRefreshingId(null);
    }
  }

  const hasStarter = licenses.some((l) => l.plan === "starter" && l.status === "active");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-400">
        <IconLoader2 className="w-6 h-6 animate-spin mr-2" /> Loading licenses...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Software Licenses</h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Manage your ProXiFi proxy management software licenses.
          </p>
        </div>
        <button
          onClick={fetchLicenses}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-all"
        >
          <IconRefresh className="w-4 h-4" /> Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-900/40 border border-red-700 p-4 text-red-300 text-sm flex gap-2">
          <IconAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {error}
        </div>
      )}

      {licenses.length === 0 ? (
        <div className="bg-gradient-to-br from-zinc-900 via-stone-950 to-black border border-zinc-800 rounded-2xl p-10 text-center">
          <IconDeviceMobile className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h2 className="text-zinc-300 font-semibold text-lg mb-2">No licenses yet</h2>
          <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">
            Get the free Starter license to evaluate the software, or purchase a paid plan for more modems and advanced features.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={activateStarter}
              disabled={activating}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50"
            >
              {activating ? <IconLoader2 className="w-4 h-4 animate-spin" /> : <IconKey className="w-4 h-4" />}
              Activate Free License
            </button>
            <Link
              href="/Software"
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
            >
              <IconShoppingCart className="w-4 h-4" /> View Plans
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {licenses.map((license) => (
            <div
              key={license._id}
              className="bg-gradient-to-br from-zinc-900 via-stone-950 to-black border border-zinc-800 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-white font-bold text-lg">{PLAN_LABELS[license.plan] ?? license.plan}</h2>
                  <p className="text-zinc-500 text-xs capitalize mt-0.5">
                    {license.billingCycle === "lifetime" ? "Lifetime license" : `${license.billingCycle} subscription`}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLES[license.status] ?? STATUS_STYLES.expired}`}>
                  {license.status}
                </span>
              </div>

              <div className="space-y-3 mb-5">
                {/* License key */}
                <div className="bg-black/40 rounded-lg px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconKey className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-zinc-500 text-sm mr-2">License Key</span>
                  </div>
                  <div className="flex items-center">
                    <code className="text-amber-300 font-mono text-sm">{license.licenseKey}</code>
                    <CopyButton text={license.licenseKey} />
                  </div>
                </div>

                {/* Dates */}
                {license.activatedAt && (
                  <div className="bg-black/40 rounded-lg px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconCalendar className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                      <span className="text-zinc-500 text-sm">Activated</span>
                    </div>
                    <span className="text-zinc-300 text-sm">
                      {new Date(license.activatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {license.expiresAt && (
                  <div className="bg-black/40 rounded-lg px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconCalendar className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                      <span className="text-zinc-500 text-sm">
                        {license.billingCycle === "lifetime" ? "Valid through" : "Renews"}
                      </span>
                    </div>
                    <span className="text-zinc-300 text-sm">
                      {new Date(license.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Download token */}
                {license.downloadToken && (
                  <div className="bg-black/40 rounded-lg px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <IconDownload className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                        <span className="text-zinc-500 text-sm">Download Token</span>
                      </div>
                      <button
                        onClick={() => refreshToken(license._id)}
                        disabled={refreshingId === license._id}
                        className="flex items-center gap-1 text-xs text-zinc-500 hover:text-amber-400 transition-colors disabled:opacity-50"
                      >
                        {refreshingId === license._id ? (
                          <IconLoader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <IconRefresh className="w-3 h-3" />
                        )}
                        Regenerate
                      </button>
                    </div>
                    <div className="flex items-center">
                      <code className="text-zinc-400 font-mono text-xs break-all">{license.downloadToken}</code>
                      <CopyButton text={license.downloadToken} />
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
                <a
                  href={`/api/software/download?token=${license.downloadToken ?? ""}`}
                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                    license.status === "active" && license.downloadToken
                      ? "bg-amber-500 hover:bg-amber-400 text-black"
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  <IconDownload className="w-4 h-4" /> Download Installer
                </a>
                <Link
                  href="/Dashboard/Billing"
                  className="flex items-center gap-2 text-sm border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-4 py-2 rounded-xl transition-all"
                >
                  Manage Billing
                </Link>
                {!hasStarter && license.plan !== "starter" && (
                  <Link
                    href="/Software"
                    className="flex items-center gap-2 text-sm border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-4 py-2 rounded-xl transition-all"
                  >
                    Upgrade Plan
                  </Link>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-center pt-2">
            <Link
              href="/Software"
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              <IconShoppingCart className="w-4 h-4" /> Add another license
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
