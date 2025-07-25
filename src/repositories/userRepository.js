import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";
import bcrypt from "bcrypt";

export class UserRepository {

    static async existsByDocument(params, clientBD) {
        const values = [
            params.document_type,
            params.document_number
        ];
        const executor = clientBD || pool;
        const result = await executor.query(Queries.USER_EXISTS, values);
        return result.rows[0].exists;
    }

    static async findByDocument(params, clientBD) {
        const values = [
            params.document_type,
            params.document_number
        ];
        const executor = clientBD || pool;
        const result = await executor.query(Queries.CLIENT_FIND_BY_DOCUMENT,values);
        return result.rows[0] || null;
    }

    static async create(params, clientBD) {

        const values = [
            params.nombres,
            params.apellidos,
            params.tipo_documento,
            params.numero_documento,
            params.email,
            params.celular,
            params.tipo_usuario,
            params.activo
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.USER_CREATE, values);
        return result.rows[0];
    }

    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}
