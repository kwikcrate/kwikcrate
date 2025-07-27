// ✅ Required Modules
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// ✅ Route Imports
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import homeRoutes from './routes/homeRoutes.js';         // 🏠 Dynamic Homepage Content
import contactRoutes from './routes/contactRoutes.js';   // ✉️ Contact Form Queries

// ✅ Load Environment Variables
dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

// ✅ Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/users', userRoutes);           // 🔐 Auth: Register/Login
app.use('/api/admin', adminRoutes);          // 🛠️ Admin Controls
app.use('/api/pages', pageRoutes);           // 📄 Static Page Management
app.use('/api/home', homeRoutes);            // 🏠 Homepage Content (Banner, Categories, Promotions)
app.use('/api/contact', contactRoutes);      // ✉️ Contact Us Form

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('✅ Kwikcrate API is running...');
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
  process.exit(1);
});

// ✅ Fallback for Unmatched Routes
app.use((req, res) => {
  res.status(404).json({ error: '❌ API route not found' });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
