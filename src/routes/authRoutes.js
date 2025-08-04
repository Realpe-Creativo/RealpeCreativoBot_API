import express from "express";
import { AuthController } from "../controllers/AuthController.js";

const router = express.Router();



// POST /api/auth/getToken - Generate Token
router.post("/getToken", AuthController.getToken);

// POST /api/auth/register - User registration
router.post("/register", AuthController.register);

export default router;
