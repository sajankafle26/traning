import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

function createRedisClient(): Redis {
  const url = process.env.REDIS_URL;
  if (!url) {
    console.warn("REDIS_URL not set — Redis caching disabled");
    return null as unknown as Redis;
  }
  const client = new Redis(url, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) return null;
      return Math.min(times * 200, 2000);
    },
    lazyConnect: true,
    enableOfflineQueue: false,
  });
  client.on("error", (err) => {
    console.error("Redis connection error:", err.message);
  });
  client.on("connect", () => {
    console.log("Redis connected");
  });
  return client;
}

export const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

export async function getRedisClient(): Promise<Redis | null> {
  if (!redis) return null;
  if (redis.status === "end" || redis.status === "close") {
    try {
      await redis.connect();
    } catch {
      return null;
    }
  }
  if (redis.status === "wait") {
    try {
      await redis.connect();
    } catch {
      return null;
    }
  }
  return redis;
}
