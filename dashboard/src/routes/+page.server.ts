import type { PageServerLoad } from './$types';
import startRedisClient from "$lib/redis/client";

export const load = (async () => {
    const client = startRedisClient();
    const key = await client.get('x-api-key');
    console.log('loaded key', key);
    client.quit();
    return {
        "apiKey" : key
    };
}) satisfies PageServerLoad;