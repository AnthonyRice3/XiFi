import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requireAdmin, isNextResponse } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import { Subscription } from "@/lib/models/Subscription";
import { SoftwareLicense } from "@/lib/models/SoftwareLicense";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Price ID → { label, amount (cents), type }
function buildPriceMap() {
  return {
    [process.env.STRIPE_PRICE_PROXY_STARTER  ?? ""]: { label: "Proxy Starter",   amount: 5500,  type: "proxy" },
    [process.env.STRIPE_PRICE_PROXY_GROWTH   ?? ""]: { label: "Proxy Growth",    amount: 7000,  type: "proxy" },
    [process.env.STRIPE_PRICE_PROXY_STANDARD ?? ""]: { label: "Proxy Standard",  amount: 9000,  type: "proxy" },
    [process.env.STRIPE_PRICE_PROXY_PREMIUM  ?? ""]: { label: "Proxy Premium",   amount: 10500, type: "proxy" },
    [process.env.STRIPE_PRICE_PROXY_MANAGER  ?? ""]: { label: "Proxy Manager",   amount: 150000, type: "one_time" },
  } as Record<string, { label: string; amount: number; type: string }>;
}

export async function GET() {
  const auth = await requireAdmin();
  if (isNextResponse(auth)) return auth;

  await connectDB();
  const priceMap = buildPriceMap();

  // ── Active subscriptions MRR ──────────────────────────────────────────────
  const [activeSubs, activeLicenses] = await Promise.all([
    Subscription.find({ status: { $in: ["active", "trialing"] } }).lean(),
    SoftwareLicense.find({ status: "active", billingCycle: { $ne: "lifetime" } }).lean(),
  ]);

  let mrrCents = 0;
  const planBreakdown: Record<string, { count: number; mrrCents: number; label: string }> = {};

  for (const sub of activeSubs) {
    const info = priceMap[sub.stripePriceId];
    const label = info?.label ?? sub.plan;
    const amount = info?.amount ?? 0;
    mrrCents += amount;
    if (!planBreakdown[sub.stripePriceId]) planBreakdown[sub.stripePriceId] = { count: 0, mrrCents: 0, label };
    planBreakdown[sub.stripePriceId].count++;
    planBreakdown[sub.stripePriceId].mrrCents += amount;
  }

  for (const lic of activeLicenses) {
    // Monthly software pricing
    const swPrices: Record<string, Record<string, number>> = {
      basic:    { monthly: 4900, quarterly: 12900 },
      premium:  { monthly: 9900, quarterly: 27900 },
      business: { monthly: 29900, quarterly: 79900 },
    };
    const amt = swPrices[lic.plan]?.[lic.billingCycle] ?? 0;
    const monthlyAmt = lic.billingCycle === "quarterly" ? Math.round(amt / 3) : amt;
    mrrCents += monthlyAmt;
    const key = `sw_${lic.plan}_${lic.billingCycle}`;
    const label = `Software ${lic.plan} (${lic.billingCycle})`;
    if (!planBreakdown[key]) planBreakdown[key] = { count: 0, mrrCents: 0, label };
    planBreakdown[key].count++;
    planBreakdown[key].mrrCents += monthlyAmt;
  }

  // ── Recent Stripe charges ─────────────────────────────────────────────────
  let recentCharges: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    description: string | null;
    email: string | null;
    created: number;
  }[] = [];

  try {
    const charges = await stripe.charges.list({ limit: 20 });
    recentCharges = charges.data.map((c) => ({
      id: c.id,
      amount: c.amount,
      currency: c.currency,
      status: c.status,
      description: c.description,
      email: c.billing_details?.email ?? null,
      created: c.created,
    }));
  } catch (err) {
    console.error("[admin/revenue] Stripe charges fetch failed:", err);
  }

  // ── All-time revenue from Stripe balance ──────────────────────────────────
  let allTimeRevenueCents = 0;
  try {
    const balance = await stripe.balance.retrieve();
    // Sum available + pending amounts in USD
    const usdAvailable = balance.available.find((b) => b.currency === "usd");
    const usdPending   = balance.pending.find((b) => b.currency === "usd");
    // Use payment_intents count as approximation via charge list
    const allCharges = await stripe.charges.list({ limit: 100 });
    allTimeRevenueCents = allCharges.data
      .filter((c) => c.status === "succeeded" && !c.refunded)
      .reduce((sum, c) => sum + c.amount, 0);
    void usdAvailable; void usdPending;
  } catch (err) {
    console.error("[admin/revenue] Stripe balance fetch failed:", err);
  }

  return NextResponse.json({
    mrr: mrrCents,
    allTimeRevenue: allTimeRevenueCents,
    activeProxySubscriptions: activeSubs.length,
    activeSoftwareLicenses: activeLicenses.length,
    planBreakdown: Object.values(planBreakdown).sort((a, b) => b.mrrCents - a.mrrCents),
    recentCharges,
  });
}
