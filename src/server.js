import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Standard Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'active', 
    service: 'FluxCore Backend',
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 FluxCore Server running on port ${PORT}`);
});