import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";

export type SoftwarePlan = "starter" | "basic" | "premium" | "business";
export type LicenseStatus = "active" | "expired" | "canceled" | "trialing";
export type BillingCycle = "monthly" | "quarterly" | "lifetime";

// Feature flags per plan
export const PLAN_FEATURES: Record<SoftwarePlan, {
  maxModems: number;
  autoProxyGen: boolean;
  ipRotation: boolean;
  scheduledRotation: boolean;
  apiRotation: boolean;
  androidManagement: boolean;
  vpnPerModem: boolean;
  tcpFingerprint: boolean;
  dnsFaker: boolean;
  stickyIp: boolean;
  customAuth: boolean;
  whitelistBlacklist: boolean;
  trafficLogs: boolean;
  sellingFeatures: boolean;
  sharedPorts: boolean;
  sellingApi: boolean;
  prioritySupport: boolean;
}> = {
  starter: {
    maxModems: 3,
    autoProxyGen: true,
    ipRotation: true,
    scheduledRotation: false,
    apiRotation: false,
    androidManagement: false,
    vpnPerModem: false,
    tcpFingerprint: false,
    dnsFaker: false,
    stickyIp: false,
    customAuth: false,
    whitelistBlacklist: false,
    trafficLogs: false,
    sellingFeatures: false,
    sharedPorts: false,
    sellingApi: false,
    prioritySupport: false,
  },
  basic: {
    maxModems: 10,
    autoProxyGen: true,
    ipRotation: true,
    scheduledRotation: true,
    apiRotation: true,
    androidManagement: true,
    vpnPerModem: false,
    tcpFingerprint: false,
    dnsFaker: false,
    stickyIp: false,
    customAuth: true,
    whitelistBlacklist: false,
    trafficLogs: true,
    sellingFeatures: false,
    sharedPorts: false,
    sellingApi: false,
    prioritySupport: false,
  },
  premium: {
    maxModems: 30,
    autoProxyGen: true,
    ipRotation: true,
    scheduledRotation: true,
    apiRotation: true,
    androidManagement: true,
    vpnPerModem: true,
    tcpFingerprint: true,
    dnsFaker: true,
    stickyIp: true,
    customAuth: true,
    whitelistBlacklist: true,
    trafficLogs: true,
    sellingFeatures: false,
    sharedPorts: false,
    sellingApi: false,
    prioritySupport: false,
  },
  business: {
    maxModems: 100,
    autoProxyGen: true,
    ipRotation: true,
    scheduledRotation: true,
    apiRotation: true,
    androidManagement: true,
    vpnPerModem: true,
    tcpFingerprint: true,
    dnsFaker: true,
    stickyIp: true,
    customAuth: true,
    whitelistBlacklist: true,
    trafficLogs: true,
    sellingFeatures: true,
    sharedPorts: true,
    sellingApi: true,
    prioritySupport: true,
  },
};

export interface ISoftwareLicense extends Document {
  clerkUserId: string;
  plan: SoftwarePlan;
  billingCycle: BillingCycle;
  status: LicenseStatus;
  licenseKey: string;

  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  stripePriceId?: string;

  activatedAt?: Date;
  expiresAt?: Date;       // null for lifetime
  cancelAtPeriodEnd: boolean;

  /** Download token – single-use token to download the software installer */
  downloadToken?: string;

  createdAt: Date;
  updatedAt: Date;
}

const SoftwareLicenseSchema = new Schema<ISoftwareLicense>(
  {
    clerkUserId:          { type: String, required: true, index: true },
    plan:                 { type: String, enum: ["starter", "basic", "premium", "business"], required: true },
    billingCycle:         { type: String, enum: ["monthly", "quarterly", "lifetime"], required: true },
    status:               { type: String, enum: ["active", "expired", "canceled", "trialing"], default: "trialing" },
    licenseKey:           { type: String, unique: true, default: () => crypto.randomUUID().toUpperCase().replace(/-/g, "-") },
    stripeSubscriptionId: { type: String },
    stripeCustomerId:     { type: String },
    stripePriceId:        { type: String },
    activatedAt:          { type: Date },
    expiresAt:            { type: Date },
    cancelAtPeriodEnd:    { type: Boolean, default: false },
    downloadToken:        { type: String },
  },
  { timestamps: true }
);

export const SoftwareLicense =
  (mongoose.models.SoftwareLicense as mongoose.Model<ISoftwareLicense>) ??
  mongoose.model<ISoftwareLicense>("SoftwareLicense", SoftwareLicenseSchema);
