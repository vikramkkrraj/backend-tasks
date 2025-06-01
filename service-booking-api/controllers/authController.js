import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, role });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refresh = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Token required' });
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};
