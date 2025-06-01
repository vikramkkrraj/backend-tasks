import express from "express";
import { signup, login, logout, refresh } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.post("/refresh", refresh);

export default router;