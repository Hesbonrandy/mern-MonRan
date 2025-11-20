import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import menuItemRoutes from './routes/menuItemRoutes.js';
import itemTypeRoutes from './routes/itemTypeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/menu', menuItemRoutes);      // ✅ Changed from /api/posts
app.use('/api/types', itemTypeRoutes);     // ✅ Changed from /api/categories
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 MonRan API running on http://localhost:${PORT}`);
});