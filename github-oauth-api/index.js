import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import './config/passport.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB connected'));

app.use('/auth', authRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
