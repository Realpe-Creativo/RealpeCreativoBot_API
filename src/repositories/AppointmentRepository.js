import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class AppointmentRepository {

    static async findById(clientData, clientBD=null) {
        const values = [
            clientData.appointment_id
        ];
        const executor = clientBD || pool;
        const result = await executor.query(Queries.APPOINTMENTS_BY_ID, values);
        return result.rows[0] || null;
    }

    static async getAppointmentsByDate(clientData) {
        const values = [
            clientData.start_date,
            clientData.end_date
        ]
        const result = await pool.query(Queries.APPOINTMENTS_BY_DATE, values);
        return result.rows || null;
    }

    static async getAppointmentsDetailByDate(clientData) {
        const values = [
            clientData.start_date,
            clientData.end_date
        ]
        const result = await pool.query(Queries.APPOINTMENT_BY_DATE_DETAIL, values);
        return result.rows || null;
    }

    static async createAppointment(clientData, clientBD) {
        const values = [
            clientData.client_id,
            clientData.start_date_time,
            clientData.end_date_time,
            clientData.google_calendar_event_id,
            clientData.google_calendar_url_event,
            clientData.current_state_id,
            clientData.observations
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.APPOINTMENT_CREATE, values);
        console.log(JSON.stringify(result.rows[0], 2, null));
        return result.rows[0] || null;
    }

    static async updateAppointment(clientData, clientBD) {
        const values = [
            clientData.appointment_id,
            clientData.client_id,
            clientData.start_date_time,
            clientData.end_date_time,
            clientData.google_calendar_event_id,
            clientData.google_calendar_url_event,
            clientData.current_state_id,
            clientData.observations
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.APPOINTMENT_UPDATE, values);
        return result.rows[0] || null;
    }

    static async updateStatus(clientData, clientBD) {
        const values = [
            clientData.appointment_id,
            clientData.current_state_id
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.APPOINTMENT_UPDATE_STATUS, values);
        return result.rows[0] || null;
    }
}