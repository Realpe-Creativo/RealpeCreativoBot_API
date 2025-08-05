import { AppointmentRepository } from "../repositories/AppointmentRepository.js";
import { pool } from "../db/connection.js";
import dayjs from 'dayjs';

export class AppointmentService {

    static async getAppointmentsByDate(clientData) {
        // const clientBD = await pool.connect();
        return await AppointmentRepository.getAppointmentsByDate(clientData);
    }

    static async getAppointmentsDetailByDate(clientData) {
        // const clientBD = await pool.connect();
        return await AppointmentRepository.getAppointmentsDetailByDate(clientData);
    }

    static async createAppointment(clientData) {
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            const appointmentCreated = await AppointmentRepository.createAppointment({
                client_id: clientData.client_id,
                product_id: clientData.product_id,
                professional_id: clientData.professional_id,
                start_date_time: dayjs(clientData.start_date_time, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
                end_date_time: dayjs(clientData.end_date_time, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
                google_calendar_event_id: clientData.google_calendar_event_id,
                google_calendar_url_event: clientData.google_calendar_url_event,
                current_state_id: clientData.current_state_id,
                observations: clientData.observations
            }, clientBD);

            await clientBD.query("COMMIT");

            return appointmentCreated;
        } catch (e) {
            await clientBD.query("ROLLBACK");
            throw e;
        } finally {
            clientBD.release();
        }
    }
}