import express from "express";
import { AppointmentController } from "../controllers/AppointmentController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// POST /api/appointments/ - Get client By DocumentType and DocumentNumber
router.post("/", AppointmentController.createAppointment);

// GET /api/appointments/ - Get client By DocumentType and DocumentNumber
router.get("/get-by-date", AppointmentController.getAppointmentsByDate);

// GET /api/appointments/ - Get client By DocumentType and DocumentNumber
router.get("/get-detail-by-date", AppointmentController.getAppointmentsDetailByDate);

export default router;
