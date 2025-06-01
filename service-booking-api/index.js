import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB connected'));

app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
