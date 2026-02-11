import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import './services/orderWorker.js';

// Initialize Workers
import './services/emailQueue.js';
import './services/refundWorker.js';

// Import Routes
import ingestionRoutes from './routes/ingestion.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Main Ingestion API
app.use('/api/ingest', ingestionRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'FluxCore Active', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 FluxCore Multi-Agent System running on port ${PORT}`);
});