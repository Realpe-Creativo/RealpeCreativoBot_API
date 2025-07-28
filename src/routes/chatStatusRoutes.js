import express from "express";
import { ChatStatusController } from "../controllers/chatStatusController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/chat-status/:number Get chat status by number
router.get("/:number", ChatStatusController.getChatStatusByNumber);

// POST /api/chat-status/:number - Create chat status for a number
router.post("/", ChatStatusController.createChatStatus);

// PATCH /api/chat-status/:number - Update chat status by number
router.patch("/:number", ChatStatusController.updateChatStatus);

export default router;