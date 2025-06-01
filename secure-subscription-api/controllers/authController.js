import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import TokenBlacklist from "../blacklist/tokenBlacklist.js";

export const signup = async (req, res) => {
    const { username, email, password, role = "user" } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hash, role });
        await user.save();
        res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        res.status(500).json({ error: "Signup failed" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
        res.json({ accessToken, refreshToken });
    } catch {
        res.status(500).json({ error: "Login failed" });
    }
};

export const logout = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    TokenBlacklist.add(token);
    res.json({ message: "Logged out" });
};

export const refresh = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken || TokenBlacklist.has(refreshToken)) return res.status(403).json({ error: "Forbidden" });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid refresh token" });
        const newAccessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
        res.json({ accessToken: newAccessToken });
    });
};