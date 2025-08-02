import { AppointmentRepository } from "../repositories/AppointmentRepository.js";
import { pool } from "../db/connection.js";

export class AppointmentService {

    static async getAppointmentsByDate(clientData) {
        const clientBD = await pool.connect();
        return await AppointmentRepository.getAppointmentsByDate(clientData, clientBD);
    }

    static async getAppointmentsDetailByDate(clientData) {
        const clientBD = await pool.connect();
        return await AppointmentRepository.getAppointmentsDetailByDate(clientData, clientBD);
    }

    static async createAppointment(clientData) {
        const clientBD = await pool.connect();
        return await AppointmentRepository.createAppointment(clientData, clientBD);
    }
}