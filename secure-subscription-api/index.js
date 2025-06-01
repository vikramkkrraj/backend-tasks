import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/content", authenticateToken, contentRoutes);
app.use("/subscription", authenticateToken, subscriptionRoutes);

const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error("DB connection error:", err));