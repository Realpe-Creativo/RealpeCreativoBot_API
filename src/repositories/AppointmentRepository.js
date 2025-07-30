import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class AppointmentRepository {

    static async findById(clientData, clientBD) {
        const values = [
            clientData.document_number
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.CLIENT_FIND_BY_DOCUMENT, values);
        return result.rows[0] || null;
    }

    static async getAppointmentsByDate(clientData, clientBD) {
        const values = [
            clientData.start_date,
            clientData.end_date
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.APPOINTMENTS_BY_DATE, values);
        return result.rows || null;
    }
}