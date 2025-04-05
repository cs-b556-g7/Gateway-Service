// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';

dotenv.config({ path: './.env' });

const app = express();

// ✅ Proper CORS setup
app.use(cors({
  origin: 'http://localhost:5173', // your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Don't need app.options('*', cors()) — already covered above

// ✅ Body parsing middleware
app.use(express.json());

// ✅ Routes
app.use('/', authRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Gateway running at http://localhost:${PORT}`);
});
