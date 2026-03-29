import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

/** Cached connection to avoid reconnecting on every hot-reload. */
interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & { mongoose?: Cached };

const cached: Cached = globalWithMongoose.mongoose ?? { conn: null, promise: null };
globalWithMongoose.mongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = MONGODB_URI.trim(); // guard against copy-paste whitespace in env var
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      dbName: "application",
      serverSelectionTimeoutMS: 10000, // fail fast in serverless (default 30s)
      connectTimeoutMS: 10000,
      socketTimeoutMS: 30000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
