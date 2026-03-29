/**
 * One-time script to grant admin role to a user by email.
 * Usage: npx ts-node -r tsconfig-paths/register scripts/make-admin.ts
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
const TARGET_EMAIL = "rnarice3@gmail.com";

async function main() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI not set in .env");

  await mongoose.connect(MONGODB_URI, { dbName: "application" });
  console.log("Connected to MongoDB");

  const result = await mongoose.connection.db!
    .collection("users")
    .findOneAndUpdate(
      { email: TARGET_EMAIL },
      { $set: { role: "admin" } },
      { returnDocument: "after" }
    );

  if (!result) {
    console.error(`No user found with email: ${TARGET_EMAIL}`);
    process.exit(1);
  }

  console.log(`✓ Role updated to admin for: ${(result as { email?: string }).email}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
