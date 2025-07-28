import { ProfessionalRepository } from "../repositories/professionalRepository.js";
import { pool } from "../db/connection.js";

export class ProfessionalService {

    static async getProfessionalById(clientData) {
        const clientBD = await pool.connect();
        return await ProfessionalRepository.findById(clientData, clientBD);
    }

    static async getProfessionalByFilters(clientData) {
        const clientBD = await pool.connect();
        return await ProfessionalRepository.findByFilters(clientData, clientBD);
    }
}