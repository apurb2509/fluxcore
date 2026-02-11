import { Queue, Worker } from 'bullmq';
import { connection } from '../config/redis.js';
import { classifyEmail } from './classifierAgent.js';
import { routeToDomain } from './domainRouter.js';

export const emailQueue = new Queue('email-ingestion', { 
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 10000 } 
  }
});

const emailWorker = new Worker(
  'email-ingestion',
  async (job) => {
    const { from, subject, body } = job.data;
    console.log(`📩 [Ingestion] Analyzing email from: ${from}`);
    
    // 1. Call the Classifier Agent (Mistral via OpenRouter)
    const classification = await classifyEmail(subject, body);
    console.log(`🤖 [AI] Decision: [${classification.category}]`);

    // 2. Route to the correct Specialist Queue
    await routeToDomain(classification, job.data);
    
    return classification;
  },
  { connection }
);

export default emailWorker;