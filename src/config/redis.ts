import { Redis } from "ioredis";
import { env } from "./env.js";

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true, // we connect manually in server.ts
});

redis.on("connect", () => console.log("Redis connecting..."));
redis.on("ready", () => console.log("Redis ready"));
redis.on("error", (err: any) => console.error("Redis error:", err.message));

export const connectRedis = async (): Promise<void> => {
  try {
    await redis.connect();
  } catch (error) {
    console.error("Redis connection failed:", error);
    process.exit(1);
  }
};
