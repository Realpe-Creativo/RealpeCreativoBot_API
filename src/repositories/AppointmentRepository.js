import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class AppointmentRepository {

    static async getAppointmentsByDate(clientData, clientBD) {
        const values = [
            clientData.start_date,
            clientData.end_date
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.APPOINTMENTS_BY_DATE, values);
        return result.rows || null;
    }

    static async getAppointmentsDetailByDate(clientData, clientBD) {
        const values = [
            clientData.start_date,
            clientData.end_date
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.APPOINTMENTS_BY_DATE, values);
        return result.rows || null;
    }

    static async createAppointment(clientData, clientBD) {
        const values = [
            clientData.client_id,
            clientData.product_id,
            clientData.professional_id,
            clientData.start_date_time,
            clientData.end_date_time,
            clientData.google_calendar_event_id,
            clientData.google_calendar_url_event,
            clientData.current_state_id,
            clientData.observations
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.APPOINTMENT_CREATE, values);
        return result.rows[0] || null;
    }
}