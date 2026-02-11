import { Queue } from 'bullmq';
import { connection } from '../config/redis.js';

// Define specialist domain queues
export const refundQueue = new Queue('refund-domain', { connection });
export const orderQueue = new Queue('order-domain', { connection });
export const crmQueue = new Queue('crm-domain', { connection });

/**
 * Routes classified emails to specialized domain workers
 */
export const routeToDomain = async (classification, originalData) => {
  const { category, urgency } = classification;
  const jobData = { ...originalData, ...classification };

  // Priority logic: High urgency jobs get processed first
  const jobOptions = {
    priority: urgency === 'high' ? 1 : 2
  };

  switch (category) {
    case 'REFUNDS':
      await refundQueue.add('process-refund', jobData, jobOptions);
      console.log('🚀 [Router] Sent to REFUND Specialist');
      break;
    case 'ORDERS':
      await orderQueue.add('process-order', jobData, jobOptions);
      console.log('🚀 [Router] Sent to ORDERS Specialist');
      break;
    default:
      await crmQueue.add('process-general', jobData, jobOptions);
      console.log('🚀 [Router] Sent to CRM/General Specialist');
  }
};