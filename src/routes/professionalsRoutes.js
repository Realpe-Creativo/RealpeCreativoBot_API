import express from "express";
import { ProfessionalController } from "../controllers/ProfessionalController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/professionals/:id - Get professional By ID
router.get("/", ProfessionalController.getProfessionalById);

// GET /api/professionals/search - Get professional By WppNumber and Occupation
router.get("/search", ProfessionalController.getProfessionalSearch);

export default router;