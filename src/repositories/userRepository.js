import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";
import bcrypt from "bcrypt";

export class UserRepository {

    static async existsByDocument(params) {
        const result = await pool.query(Queries.USER_EXISTS,
            [ params.document_type, params.document_number ]);
        return result.rows[0].exists;
    }

    static async findByDocument(params) {
        const result = await pool.query(Queries.CLIENT_FIND_BY_DOCUMENT,
            [ params.document_type, params.document_number ]);
        return result.rows[0] || null;
    }

    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}
