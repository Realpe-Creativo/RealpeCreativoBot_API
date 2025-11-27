import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";
import bcrypt from "bcrypt";

export class UserRepository {

    static async existsByEmail(params, clientBD) {
        const values = [
            params.email
        ];
        const executor = clientBD || pool;
        const result = await executor.query(Queries.USER_EXISTS, values);
        return result.rows[0].exists;
    }

    static async findByEmail(params) {
        const values = [
            params.email
        ];
        // const executor = clientBD || pool;
        const result = await pool.query(Queries.CLIENT_FIND_BY_DOCUMENT,values);
        return result.rows[0] || null;
    }

    static async create(params, clientBD) {

        const values = [
            params.nombres,
            params.email,
            params.celular,
            params.tipo_usuario
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.USER_CREATE, values);
        return result.rows[0];
    }

    static async update(params, clientBD) {

        const values = [
            params.user_id,
            params.numero_documento,
            params.nombres,
            params.apellidos,
            params.tipo_documento,
            params.email,
            params.celular
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.USER_UPDATE, values);
        return result.rows[0];
    }

    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}
