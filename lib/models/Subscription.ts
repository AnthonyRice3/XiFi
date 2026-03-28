import mongoose, { Document, Schema } from "mongoose";

export type PlanType = "shared_mobile" | "dedicated_mobile";
export type SubStatus = "active" | "past_due" | "canceled" | "trialing" | "incomplete";

export interface ISubscription extends Document {
  clerkUserId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  plan: PlanType;
  status: SubStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    clerkUserId:           { type: String, required: true, index: true },
    stripeSubscriptionId:  { type: String, required: true, unique: true },
    stripeCustomerId:      { type: String, required: true },
    stripePriceId:         { type: String, required: true },
    plan:                  { type: String, enum: ["shared_mobile", "dedicated_mobile"], required: true },
    status:                { type: String, enum: ["active", "past_due", "canceled", "trialing", "incomplete"], required: true },
    currentPeriodStart:    { type: Date, required: true },
    currentPeriodEnd:      { type: Date, required: true },
    cancelAtPeriodEnd:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Subscription =
  (mongoose.models.Subscription as mongoose.Model<ISubscription>) ??
  mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
