import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Standard connection logic using the Master Token URL
export const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

connection.on('connect', () => console.log('✅ FluxCore Memory: Redis Connected (Cloud)'));
connection.on('error', (err) => console.error('❌ Redis Connection Error:', err.message));