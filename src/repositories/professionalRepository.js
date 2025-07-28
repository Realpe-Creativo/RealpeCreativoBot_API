import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class ProfessionalRepository {

    static async findById(clientData, clientBD) {
        const values = [
            clientData.id
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.PROFESSIONAL_BY_ID, values);
        return result.rows[0] || null;
    }

    static async findByFilters(clientData, clientBD) {
        const values = [
            clientData.id,
            clientData.occupation,
            clientData.number
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.PROFESSIONAL_BY_FILTERS, values);
        return result.rows[0] || null;
    }
}