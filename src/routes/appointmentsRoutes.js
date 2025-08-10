import express from "express";
import { AppointmentController } from "../controllers/AppointmentController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// POST /api/appointments/?id=0 - Get appointment By Id
router.get("/", AppointmentController.getAppointmentById);

// POST /api/appointments/ - Create appointment
router.post("/", AppointmentController.createAppointment);

// GET /api/appointments/get-by-date - Get appointments By StartDate and EndDate
router.get("/get-by-date", AppointmentController.getAppointmentsByDate);

// GET /api/appointments/get-detail-by-date - Get appointments detail By StartDate and EndDate
router.get("/get-detail-by-date", AppointmentController.getAppointmentsDetailByDate);

// PATCH /api/appointments/update-status - Modify only the status of the appointment by ID
router.patch("/update-status", AppointmentController.updateStatusAppointment);

// PUT /api/appointments/update-appointment - Modify the information of the appointment by ID
router.put("/update-appointment", AppointmentController.updateAppointment);

export default router;
