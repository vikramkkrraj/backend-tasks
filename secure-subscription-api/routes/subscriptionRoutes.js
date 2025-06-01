import express from "express";
import { subscribe, checkStatus, renew, cancel } from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/", subscribe);
router.get("/status", checkStatus);
router.patch("/renew", renew);
router.post("/cancel", cancel);

export default router;