import { createClient } from 'redis'

type RedisClientType = ReturnType<typeof createClient>

export default function startRedisClient(): RedisClientType {
    const redisClient: RedisClientType = createClient({ url: `redis://redis:6379` });
    redisClient.on('error', err => console.error('Redis Client Error', err));
    redisClient.on('connect', () => console.info('Redis Client Connected'));
    redisClient.connect();
    return redisClient;
}