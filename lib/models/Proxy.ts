import mongoose, { Document, Schema } from "mongoose";

export type ProxyType = "shared_mobile" | "dedicated_mobile";
export type ProxyStatus = "active" | "inactive" | "rotating";

export interface IProxy extends Document {
  clerkUserId: string;
  subscriptionId: string;
  type: ProxyType;
  label: string;

  /** Proxy connection details surfaced to the user */
  host: string;
  httpPort: number;
  socks5Port: number;
  username: string;
  password: string;

  /** Geographic / carrier info */
  country: string;
  carrier: string;
  isp: string;

  status: ProxyStatus;
  lastRotatedAt?: Date;
  expiresAt: Date;

  /** Reference to external proxy software device ID */
  deviceId?: string;

  createdAt: Date;
  updatedAt: Date;
}

const ProxySchema = new Schema<IProxy>(
  {
    clerkUserId:    { type: String, required: true, index: true },
    subscriptionId: { type: String, required: true },
    type:           { type: String, enum: ["shared_mobile", "dedicated_mobile"], required: true },
    label:          { type: String, required: true },
    host:           { type: String, required: true },
    httpPort:       { type: Number, required: true },
    socks5Port:     { type: Number, required: true },
    username:       { type: String, required: true },
    password:       { type: String, required: true },
    country:        { type: String, default: "US" },
    carrier:        { type: String, default: "T-Mobile" },
    isp:            { type: String, default: "T-Mobile USA" },
    status:         { type: String, enum: ["active", "inactive", "rotating"], default: "active" },
    lastRotatedAt:  { type: Date },
    expiresAt:      { type: Date, required: true },
    deviceId:       { type: String },
  },
  { timestamps: true }
);

export const Proxy =
  (mongoose.models.Proxy as mongoose.Model<IProxy>) ??
  mongoose.model<IProxy>("Proxy", ProxySchema);
