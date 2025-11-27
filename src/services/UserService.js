import { UserRepository } from "../repositories/UserRepository.js";
import {pool} from "../db/connection.js";

export class UserService {

    static async existsByDocument({ email }) {
        return await UserRepository.existsByEmail({ email });
    }

}