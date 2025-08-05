import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class ProfessionalRepository {

    static async findById(clientData) {
        const values = [
            clientData.id
        ]
        // const executor = clientBD || pool;
        const result = await pool.query(Queries.PROFESSIONAL_BY_ID, values);
        return result.rows[0] || null;
    }

    static async findByFilters(clientData) {
        const values = [
            clientData.id,
            clientData.occupation,
            clientData.number
        ]
        // const executor = clientBD || pool;
        const result = await pool.query(Queries.PROFESSIONAL_BY_FILTERS, values);
        return result.rows[0] || null;
    }
}