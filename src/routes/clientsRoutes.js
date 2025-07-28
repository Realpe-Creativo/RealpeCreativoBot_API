import express from "express";
import { ClientsController } from "../controllers/clientsControllers.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// POST /api/clients/getClient - Get client By DocumentType and DocumentNumber
router.post("/getClient", ClientsController.getClientByDocument);

// POST /api/clients/getClient - Get client By DocumentType and DocumentNumber
router.post("/createClient", ClientsController.createClient);

export default router;
