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

// PATCH /api/appointments/ - Get client By DocumentType and DocumentNumber
router.patch("/modify-status", AppointmentController.getAppointmentsByDate);

// PATCH /api/appointments/ - Get client By DocumentType and DocumentNumber
router.put("/update-appointment", AppointmentController.updateAppointment);

export default router;
