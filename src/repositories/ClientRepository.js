import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class ClientRepository {

    static async findById(clientData, clientBD) {
        const values = [
            clientData.document_number
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.CLIENT_FIND_BY_DOCUMENT, values);
        return result.rows[0] || null;
    }

    static async create(clientData, clientBD) {

        const values = [
            clientData.user_id,
            clientData.guardian_name,
            clientData.date_of_birth,
            clientData.neighborhood,
            clientData.address,
            clientData.sent_by_institution,
            clientData.institution
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.CLIENT_CREATE, values);
        return result.rows[0];
    }

    static async update(clientData, clientBD) {

        const values = [
            clientData.user_id,
            clientData.guardian_name,
            clientData.date_of_birth,
            clientData.neighborhood,
            clientData.address,
            clientData.sent_by_institution,
            clientData.institution
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.CLIENT_UPDATE, values);
        return result.rows[0];
    }
}
