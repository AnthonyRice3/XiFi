import mongoose, { Document, Schema } from "mongoose";

export type TicketStatus   = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory = "billing" | "technical" | "account" | "proxy" | "other";

export interface ITicketMessage {
  role: "user" | "moderator";
  authorId: string;
  authorEmail: string;
  content: string;
  createdAt: Date;
}

export interface ISupportTicket extends Document {
  ticketId: string;           // human-readable e.g. TKT-00042
  clerkUserId: string;
  userEmail: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  messages: ITicketMessage[];
  assignedTo?: string;        // clerk user ID of moderator
  createdAt: Date;
  updatedAt: Date;
}

const TicketMessageSchema = new Schema<ITicketMessage>(
  {
    role:        { type: String, enum: ["user", "moderator"], required: true },
    authorId:    { type: String, required: true },
    authorEmail: { type: String, required: true },
    content:     { type: String, required: true },
    createdAt:   { type: Date, default: () => new Date() },
  },
  { _id: false }
);

let counter = 0;

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    ticketId:    { type: String, unique: true },
    clerkUserId: { type: String, required: true, index: true },
    userEmail:   { type: String, required: true },
    subject:     { type: String, required: true },
    category:    { type: String, enum: ["billing", "technical", "account", "proxy", "other"], required: true },
    priority:    { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
    status:      { type: String, enum: ["open", "in_progress", "resolved", "closed"], default: "open" },
    messages:    { type: [TicketMessageSchema], default: [] },
    assignedTo:  { type: String },
  },
  { timestamps: true }
);

// Auto-generate a human-readable ticket ID before saving
SupportTicketSchema.pre("save", async function () {
  if (!this.ticketId) {
    const count = mongoose.models.SupportTicket
      ? await (mongoose.models.SupportTicket as mongoose.Model<ISupportTicket>).countDocuments()
      : counter++;
    this.ticketId = `TKT-${String(Number(count) + 1).padStart(5, "0")}`;
  }
});

export const SupportTicket =
  (mongoose.models.SupportTicket as mongoose.Model<ISupportTicket>) ??
  mongoose.model<ISupportTicket>("SupportTicket", SupportTicketSchema);
