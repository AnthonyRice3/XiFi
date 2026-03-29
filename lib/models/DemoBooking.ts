import mongoose, { Schema, Document } from "mongoose";

export interface IDemoBooking extends Document {
  name: string;
  email: string;
  company?: string;
  interest: string;
  message?: string;
  status: "pending" | "scheduled" | "completed" | "cancelled";
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DemoBookingSchema = new Schema<IDemoBooking>(
  {
    name:      { type: String, required: true },
    email:     { type: String, required: true, lowercase: true },
    company:   { type: String },
    interest:  { type: String, default: "general" },
    message:   { type: String },
    status:    { type: String, enum: ["pending", "scheduled", "completed", "cancelled"], default: "pending" },
    scheduledAt: { type: Date },
  },
  { timestamps: true }
);

export const DemoBooking =
  (mongoose.models.DemoBooking as mongoose.Model<IDemoBooking>) ??
  mongoose.model<IDemoBooking>("DemoBooking", DemoBookingSchema);
