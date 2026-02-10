import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null, // Required for BullMQ
};

export const connection = new Redis(redisConfig);

connection.on('connect', () => console.log('✅ Redis Connected'));
connection.on('error', (err) => console.error('❌ Redis Error:', err));