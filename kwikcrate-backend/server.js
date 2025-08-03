// Load Environment Variables
import dotenv from 'dotenv';
dotenv.config();

// Required Modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import pageRoutes from './routes/pageRoutes.js';

// Environment Variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

// Initialize Express App
const app = express();

// CORS Configuration (support local + production frontend)
app.use(cors({
  origin: [CLIENT_ORIGIN],
  credentials: true,
}));

// Middleware
app.use(express.json());

// Root Test Endpoint
app.get('/', (req, res) => {
  res.send("🚀 Kwikcrate API is live...");
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pages', pageRoutes);

// Connect to MongoDB and Start Server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
