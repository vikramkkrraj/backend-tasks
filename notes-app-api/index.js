import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB connected'));

app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
