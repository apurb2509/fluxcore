import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

export const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  connectTimeout: 20000, // Increase to 20s
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  reconnectOnError(err) {
    const targetError = "READONLY";
    if (err.message.includes(targetError)) {
      return true; // Force reconnect
    }
    return false;
  },
});

connection.on('connect', () => console.log('✅ FluxCore Memory: Redis Connected (Cloud)'));
connection.on('error', (err) => console.error('❌ Redis Connection Error:', err.message));