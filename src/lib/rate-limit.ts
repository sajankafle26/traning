import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";

const RATE_LIMIT_WINDOW = 60; // seconds
const RATE_LIMIT_MAX = 30; // requests per window

export async function rateLimit(
  key: string,
  limit = RATE_LIMIT_MAX,
  window = RATE_LIMIT_WINDOW
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  try {
    const client = await getRedisClient();
    if (!client) {
      return { allowed: true, remaining: limit, resetIn: 0 };
    }

    const now = Math.floor(Date.now() / 1000);
    const windowKey = `ratelimit:${key}:${Math.floor(now / window)}`;

    const current = await client.incr(windowKey);
    if (current === 1) {
      await client.expire(windowKey, window);
    }

    return {
      allowed: current <= limit,
      remaining: Math.max(0, limit - current),
      resetIn: window - (now % window),
    };
  } catch {
    return { allowed: true, remaining: limit, resetIn: 0 };
  }
}

export async function rateLimitMiddleware(
  request: Request,
  context: string,
  limit = RATE_LIMIT_MAX,
  window = RATE_LIMIT_WINDOW
): Promise<NextResponse | null> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const key = `${context}:${ip}`;

  const result = await rateLimit(key, limit, window);

  if (!result.allowed) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(result.resetIn),
          "X-RateLimit-Remaining": String(result.remaining),
        },
      }
    );
  }

  return null;
}
