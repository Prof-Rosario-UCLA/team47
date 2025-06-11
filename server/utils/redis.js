import { createClient } from 'redis';

let redisClient = null;

async function getRedisClient() {
  if (!redisClient) {
    console.log('Creating new Redis client', process.env.REDIS_HOST, process.env.REDIS_PORT);
    redisClient = createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });
    
    redisClient.on('error', err => {
      console.error('Redis Client Error:', err);
      redisClient = null; // Reset the client on error
    });
    
    await redisClient.connect();
    console.log('Connected to Redis successfully');
  }
  
  return redisClient;
}

export async function fetchEventsFromCache(date) {
    const key = `events:${date}:all`;
    return null;

    // try {
    //     const client = await getRedisClient();

    //     console.log(`Attempting to fetch events on ${date} from cache`);
    //     const data = await client.get(key);

    //     if (data && JSON.parse(data)) {
    //         console.log('Cache hit');
    //         return JSON.parse(data);
    //     } else {
    //         console.log('Cache miss');
    //         return null;
    //     }

    // } catch(e) {
    //     console.error(`Error fetching from Redis:`, e);
    //     return null;
    // }
}

export async function cacheEvents(date, events, expiration = 300) {
    const key = `events:${date}:all`;
    return true;

    // try {
    //     const client = await getRedisClient();

    //     console.log(`Writing events to cache for ${date}`);
    //     await client.set(key, JSON.stringify(events), { EX: expiration });
    //     console.log(`Cache updated.`);

    //     return true;

    // } catch(e) {
    //     console.error(`Error caching to Redis:`, e);
    //     return false;
    // }
}

export async function invalidateEventsCache(date) {
    const key = `events:${date}:all`;

    try {
        const client = await getRedisClient();
        await client.del(key);

    } catch(e) {
        console.error(`Error invalidating cache:`, e);
        return false;
    }
}

export default { fetchEventsFromCache, cacheEvents };