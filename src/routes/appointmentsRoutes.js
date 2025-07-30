import express from "express";
import { AppointmentController } from "../controllers/AppointmentController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// POST /api/appointments/get-by-id - Get client By DocumentType and DocumentNumber
router.post("/get-by-id", AppointmentController.getAppointmentById);

// POST /api/clients/getClient - Get client By DocumentType and DocumentNumber
// router.post("/createClient", AppointmentController.createClient);

export default router;
