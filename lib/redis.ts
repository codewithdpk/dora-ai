import { createClient } from "redis";

export async function redisClient() {
  const redis = await createClient({
    url: process.env.REDIS_URL ?? process.env.KV_URL,
  }).connect();

  return redis;
}
