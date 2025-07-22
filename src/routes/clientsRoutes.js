import express from "express";
import { ClienteController } from "../controllers/clientsControllers.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticate);

// POST /api/clients/getClient - Get client By DocumentType and DocumentNumber
router.post("/getClient", ClienteController.getClientByDocument);

// POST /api/clients/getClient - Get client By DocumentType and DocumentNumber
router.post("/createClient", ClienteController.createClient);

export default router;
