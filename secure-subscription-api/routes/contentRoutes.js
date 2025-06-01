import express from "express";
import { getFreeContent, getPremiumContent, createContent, deleteContent } from "../controllers/contentController.js";
import { authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/free", getFreeContent);
router.get("/premium", authorizeRoles(["premium", "pro"]), getPremiumContent);
router.post("/", authorizeRoles(["admin"]), createContent);
router.delete("/:id", authorizeRoles(["admin"]), deleteContent);

export default router;