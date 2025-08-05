import { ProfessionalRepository } from "../repositories/ProfessionalRepository.js";
import { pool } from "../db/connection.js";

export class ProfessionalService {

    static async getProfessionalById(clientData) {
        // const clientBD = await pool.connect();
        return await ProfessionalRepository.findById(clientData);
    }

    static async getProfessionalByFilters(clientData) {
        // const clientBD = await pool.connect();
        return await ProfessionalRepository.findByFilters(clientData);
    }
}