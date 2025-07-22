import { pool } from "../db/connection.js";
import bcrypt from "bcrypt";
import Queries from "../utilities/constants/Queries.js";


export class AuthLoginRepository {

    static async findByLogin(login) {

        const result = await pool.query(Queries.AUTH_LOGIN_FIND_BY_LOGIN, [login])
        return result.rows[0] || null
    }

    static async create(authLoginData) {
        const hashedPassword = await bcrypt.hash(authLoginData.password, Number.parseInt(process.env.BCRYPT_ROUNDS) || 12)

        const values = [
            authLoginData.login,
            hashedPassword,
            authLoginData.rol,
        ]

        const result = await pool.query(Queries.AUTH_LOGIN_CREATE, values);
        return result.rows[0];
    }

    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}