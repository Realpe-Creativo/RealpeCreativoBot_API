import { UserRepository } from "../repositories/userRepository.js";
import {pool} from "../db/connection.js";

export class UserService {

    static async existsByDocument({ document_number }) {
        const clientBD = await pool.connect();
        return await UserRepository.existsByDocument({ document_number });
    }

}