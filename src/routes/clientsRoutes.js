import express from "express";
import { ClientController } from "../controllers/ClientControllers.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// POST /api/clients/get-client - Get client By DocumentNumber
router.post("/get-client", ClientController.getClientByDocument);

// POST /api/clients/create-client - Create client
router.post("/create-client", ClientController.createClient);

// PATCH /api/clients/update-client - Update client
router.patch("/update-client", ClientController.updateClient);

export default router;
