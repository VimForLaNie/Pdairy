import redis from "redis";

const redisClient = redis.createClient({
    url: 'redis://redis:6379'
});

redisClient.on('error', err => console.log('Redis Client Error', err));

export default redisClient;