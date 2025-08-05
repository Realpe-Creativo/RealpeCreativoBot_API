import { UserRepository } from "../repositories/UserRepository.js";
import {pool} from "../db/connection.js";

export class UserService {

    static async existsByDocument({ document_number }) {
        return await UserRepository.existsByDocument({ document_number });
    }

}