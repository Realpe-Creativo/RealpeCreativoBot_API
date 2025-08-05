import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class ChatStatusRepository {
    static async findByNumber(clientData) {
        const values = [
            clientData.number
        ]
        // const executor = clientBD || pool;
        const result = await pool.query(Queries.CHAT_STATUS_BY_NUMBER, values);
        return result.rows[0] || null;
    }

    static async existsByNumber(params) {
        const values = [
            params.number
        ];
        // const executor = clientBD || pool;
        const result = await pool.query(Queries.CHAT_STATUS_EXISTS, values);
        return result.rows[0].exists;
    }

    static async create(clientData, clientBD) {

        const values = [
            clientData.numero,
            clientData.estado
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.CHAT_STATUS_CREATE, values);
        return result.rows[0];
    }

    static async update(clientData, clientBD) {

        const values = [
            clientData.id,
            clientData.estado
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.CHAT_STATUS_UDPATE, values);
        return result.rows[0];
    }
}