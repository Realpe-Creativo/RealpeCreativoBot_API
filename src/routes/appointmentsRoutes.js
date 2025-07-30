import express from "express";
import { AppointmentController } from "../controllers/AppointmentController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/appointments/ - Get client By DocumentType and DocumentNumber
router.get("/get-by-date", AppointmentController.getAppointmentsByDate);

// POST /api/appointments/ - Get client By DocumentType and DocumentNumber
router.post("/", AppointmentController.createAppointment);

// POST /api/clients/getClient - Get client By DocumentType and DocumentNumber
// router.post("/createClient", AppointmentController.createClient);

export default router;
