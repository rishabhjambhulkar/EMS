import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import bookroutes from './routes/ToDoRoutes.js';
import cors from 'cors';  // Importing cors

// dotenv.config();

// DB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/connectverse')
  .then(() => {
    console.log('Connected to DB1');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Allow CORS for Vite frontend
const allowedOrigins = ['http://localhost:5173'];  // Vite frontend origin
app.use(cors({
  origin: allowedOrigins, // Specify the allowed origin
  credentials: true // Enable credentials if using cookies or auth headers
}));

app.use(express.json());
app.use(cookieParser());

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', bookroutes);

// Default route
app.use('/', (req, res) => res.json({ message: 'server running' }));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
