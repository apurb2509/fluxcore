import { Worker } from 'bullmq';
import { connection } from '../config/redis.js';

const orderWorker = new Worker(
  'order-domain',
  async (job) => {
    const { from, subject, urgency } = job.data;
    
    console.log(`📦 [Order Agent] Processing logistics for: ${from}`);
    console.log(`📍 [Task]: Tracking "${subject}" | Priority: ${urgency}`);
    
    // Logic for tracking numbers/shipping status goes here
    return { success: true, action: "shipping_status_retrieved" };
  },
  { connection }
);

export default orderWorker;