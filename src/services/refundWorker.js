import { Worker } from 'bullmq';
import { connection } from '../config/redis.js';

const refundWorker = new Worker(
  'refund-domain',
  async (job) => {
    const { from, reason, urgency } = job.data;
    
    console.log(`💰 [Refund Agent] Waking up for: ${from}`);
    console.log(`⚠️ [Urgency]: ${urgency.toUpperCase()}`);
    
    // Future: DB checks or Stripe API integration goes here
    console.log(`✅ [Refund Agent] Logic applied: ${reason}`);
    
    return { success: true, processedAt: new Date() };
  },
  { connection }
);

export default refundWorker;