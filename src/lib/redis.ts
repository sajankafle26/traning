import { Redis } from "@upstash/redis";

let _redis: Redis | null | undefined = undefined;

function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    console.warn("UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set — Redis caching disabled");
    return null;
  }
  return new Redis({ url, token });
}

export function getRedis() {
  if (_redis === undefined) {
    _redis = createRedis();
  }
  return _redis;
}

export async function getRedisClient(): Promise<Redis | null> {
  return getRedis();
}
