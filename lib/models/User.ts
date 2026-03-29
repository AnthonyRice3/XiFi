import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  clerkUserId: string;
  email: string;
  stripeCustomerId?: string;
  role: "user" | "moderator" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkUserId: { type: String, required: true, unique: true, index: true },
    email:       { type: String, required: true, unique: true },
    stripeCustomerId: { type: String },
    role: { type: String, enum: ["user", "moderator", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const User =
  (mongoose.models.User as mongoose.Model<IUser>) ??
  mongoose.model<IUser>("User", UserSchema);
