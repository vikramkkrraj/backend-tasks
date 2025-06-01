import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { authMiddleware } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB connected'));

app.use('/auth', authRoutes);
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You accessed a protected route', user: req.user });
});

app.listen(3000, () => console.log('Server running on port 3000'));
