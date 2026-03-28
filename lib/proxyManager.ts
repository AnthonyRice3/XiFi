/**
 * proxyManager.ts
 *
 * Abstraction layer for interacting with mobile proxy devices / proxy software.
 *
 * Replace the placeholder implementations below with real API calls to your
 * proxy hosting software (e.g. iProxy, MobileHop, 3proxy control panel, etc.).
 *
 * Every public function is async so callers don't need to change when you
 * swap in real provider calls.
 */

import crypto from "crypto";

const PROXY_API_URL  = process.env.PROXY_MANAGER_API_URL  ?? "";
const PROXY_API_KEY  = process.env.PROXY_MANAGER_API_KEY  ?? "";
const PROXY_HOST     = process.env.PROXY_HOST             ?? "proxy.yourdomainhere.com";
const HTTP_PORT_BASE = parseInt(process.env.PROXY_HTTP_PORT_BASE ?? "10000", 10);
const SOCKS_PORT_BASE = parseInt(process.env.PROXY_SOCKS_PORT_BASE ?? "20000", 10);

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ProvisionedProxy {
  deviceId: string;
  host: string;
  httpPort: number;
  socks5Port: number;
  username: string;
  password: string;
  country: string;
  carrier: string;
  isp: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function generateCredentials(): { username: string; password: string } {
  const username = "user_" + crypto.randomBytes(6).toString("hex");
  const password = crypto.randomBytes(16).toString("hex");
  return { username, password };
}

/** Simple sequential port assignment – replace with a real pool manager. */
function assignPorts(deviceIndex: number) {
  return {
    httpPort:   HTTP_PORT_BASE  + deviceIndex,
    socks5Port: SOCKS_PORT_BASE + deviceIndex,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Provision a new proxy for a user.
 * Calls your proxy management panel to allocate a device and set credentials.
 *
 * @param type  "shared_mobile" | "dedicated_mobile"
 * @param index  Numeric index used for port assignment when no real panel exists.
 */
export async function provisionProxy(
  type: "shared_mobile" | "dedicated_mobile",
  index = 0
): Promise<ProvisionedProxy> {
  const { username, password } = generateCredentials();
  const { httpPort, socks5Port } = assignPorts(index);

  // ── Real integration point ────────────────────────────────────────────────
  if (PROXY_API_URL && PROXY_API_KEY) {
    const res = await fetch(`${PROXY_API_URL}/devices/provision`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PROXY_API_KEY}`,
      },
      body: JSON.stringify({ type, username, password }),
    });

    if (!res.ok) throw new Error(`Proxy manager error: ${res.statusText}`);
    const data = await res.json();

    return {
      deviceId:  data.deviceId,
      host:      data.host ?? PROXY_HOST,
      httpPort:  data.httpPort ?? httpPort,
      socks5Port: data.socks5Port ?? socks5Port,
      username,
      password,
      country:   data.country ?? "US",
      carrier:   data.carrier ?? "T-Mobile",
      isp:       data.isp    ?? "T-Mobile USA",
    };
  }
  // ── Fallback / dev mode ────────────────────────────────────────────────────
  return {
    deviceId:  `dev_${crypto.randomBytes(4).toString("hex")}`,
    host:      PROXY_HOST,
    httpPort,
    socks5Port,
    username,
    password,
    country:  "US",
    carrier:  type === "dedicated_mobile" ? "AT&T" : "T-Mobile",
    isp:      type === "dedicated_mobile" ? "AT&T Mobility" : "T-Mobile USA",
  };
}

/**
 * Rotate the IP of an active mobile proxy (request a new cellular IP).
 * Returns the new IP address if the panel returns it; undefined otherwise.
 */
export async function rotateProxy(deviceId: string): Promise<string | undefined> {
  if (PROXY_API_URL && PROXY_API_KEY) {
    const res = await fetch(`${PROXY_API_URL}/devices/${deviceId}/rotate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${PROXY_API_KEY}` },
    });
    if (!res.ok) throw new Error(`Rotation failed: ${res.statusText}`);
    const data = await res.json();
    return data.newIp as string | undefined;
  }
  // Dev mode: simulate rotation with a random IP
  const fakeIp = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".");
  return fakeIp;
}

/**
 * Deactivate / release a proxy device back to the pool.
 */
export async function deprovisionProxy(deviceId: string): Promise<void> {
  if (PROXY_API_URL && PROXY_API_KEY) {
    await fetch(`${PROXY_API_URL}/devices/${deviceId}/deprovision`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${PROXY_API_KEY}` },
    });
  }
  // Dev mode: no-op
}

/**
 * Fetch live status of a device (uptime, current IP, bandwidth).
 */
export async function getDeviceStatus(deviceId: string): Promise<{
  online: boolean;
  currentIp?: string;
  uptimeSeconds?: number;
}> {
  if (PROXY_API_URL && PROXY_API_KEY) {
    const res = await fetch(`${PROXY_API_URL}/devices/${deviceId}/status`, {
      headers: { Authorization: `Bearer ${PROXY_API_KEY}` },
    });
    if (!res.ok) return { online: false };
    return res.json();
  }
  // Dev mode
  return { online: true, currentIp: "104.18.22.44", uptimeSeconds: 3600 };
}
