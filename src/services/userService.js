import { UserRepository } from "../repositories/userRepository.js";

export class UserService {

    static async existsByDocument({ document_type, document_number }) {
        console.log(document_type, document_number)
        return await UserRepository.existsByDocument({ document_type, document_number });
    }

}