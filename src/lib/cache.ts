import { getRedisClient } from "@/lib/redis";
import { NextResponse } from "next/server";

export function buildCacheKey(...parts: string[]): string {
  return `sangalo:${parts.join(":")}`;
}

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const client = await getRedisClient();
    if (!client) return null;
    const data = await client.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

export async function setCache(key: string, data: unknown, ttl = 300): Promise<void> {
  try {
    const client = await getRedisClient();
    if (!client) return;
    const serialized = JSON.stringify(data);
    if (ttl > 0) {
      await client.setex(key, ttl, serialized);
    } else {
      await client.set(key, serialized);
    }
  } catch {
    // silently skip
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    const client = await getRedisClient();
    if (!client) return;
    await client.del(key);
  } catch {
    // silently skip
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  try {
    const client = await getRedisClient();
    if (!client) return;
    let cursor = "0";
    do {
      const [nextCursor, keys] = await client.scan(
        cursor,
        "MATCH",
        `sangalo:${pattern}`,
        "COUNT",
        50
      );
      cursor = nextCursor;
      if (keys.length > 0) {
        await client.del(...keys);
      }
    } while (cursor !== "0");
  } catch {
    // silently skip
  }
}

export async function getOrSetCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 300
): Promise<T> {
  const cached = await getCache<T>(key);
  if (cached !== null) return cached;
  const fresh = await fetchFn();
  await setCache(key, fresh, ttl);
  return fresh;
}

export async function cachedApiGet<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>,
  ttl = 300
): Promise<NextResponse> {
  const cached = await getCache<T>(cacheKey);
  if (cached) return NextResponse.json(cached);
  const data = await fetchFn();
  await setCache(cacheKey, data, ttl);
  return NextResponse.json(data);
}

export async function invalidateModelCache(modelName: string): Promise<void> {
  await invalidateCache(`api:${modelName}:*`);
}
