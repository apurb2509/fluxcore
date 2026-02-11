import { Queue, Worker } from 'bullmq';
import { connection } from '../config/redis.js';
import { classifyEmail } from './classifierAgent.js';
import { routeToDomain } from './domainRouter.js';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();
export const emailQueue = new Queue('email-ingestion', { connection });

const emailWorker = new Worker(
  'email-ingestion',
  async (job) => {
    const { from, subject, body } = job.data;
    console.log(`📩 [Ingestion] Analyzing: ${from}`);
    
    const classification = await classifyEmail(subject, body);

    // PERSIST TO MYSQL
    await db.emailLog.create({
      data: {
        emailFrom: from,
        subject,
        body,
        category: classification.category,
        urgency: classification.urgency,
        reason: classification.reason
      }
    });

    await routeToDomain(classification, job.data);
    return classification;
  },
  { connection }
);