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

// Check Environment Variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

// Initialize App
const app = express();

// Middleware
app.use(cors()); // You can customize: cors({ origin: "http://localhost:3000" })
app.use(express.json());

// Root Endpoint for Testing
app.get('/', (req, res) => {
  res.send("🚀 Kwikcrate API is running...");
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pages', pageRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');

  // Start Server after successful DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
