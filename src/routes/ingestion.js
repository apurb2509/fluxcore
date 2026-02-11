import express from 'express';
import { emailQueue } from '../services/emailQueue.js';

const router = express.Router();

router.post('/email', async (req, res) => {
  try {
    const { from, subject, body } = req.body;

    if (!from || !body) {
      return res.status(400).json({ error: 'Sender and Body are required' });
    }

    // Add to BullMQ
    const job = await emailQueue.add('new-email', { from, subject, body });

    res.status(202).json({ 
      message: 'Email accepted and queued', 
      jobId: job.id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;