import mongoose, { Schema, Document } from "mongoose";

export interface IWaitlist extends Document {
  email: string;
  name?: string;
  interest?: string; // "proxy_service" | "proxy_manager" | "both" | "general"
  notes?: string;
  source: string;   // page where they signed up
  status: "pending" | "invited" | "converted";
  invitedAt?: Date;
  createdAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>(
  {
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    name:     { type: String, default: "" },
    interest: { type: String, default: "general" },
    notes:    { type: String, default: "" },
    source:   { type: String, default: "/contact" },
    status:   { type: String, enum: ["pending", "invited", "converted"], default: "pending" },
    invitedAt: { type: Date },
  },
  { timestamps: true }
);

export const Waitlist =
  (mongoose.models.Waitlist as mongoose.Model<IWaitlist>) ||
  mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);
