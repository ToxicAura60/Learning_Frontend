import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL!,

  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error("Redis reconnect failed");
        return new Error("Retry attempts exhausted");
      }

      return Math.min(retries * 100, 3000);
    },
  },
});


export async function connectRedis() {
  if (redis.isOpen) {
    return;
  }

  try {
    await redis.connect();
  } catch (err) {
    console.error("Failed to connect Redis:", err);
    process.exit(1);
  }
}