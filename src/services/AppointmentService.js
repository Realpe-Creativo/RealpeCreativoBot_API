import { ClientRepository } from "../repositories/ClientRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { pool } from "../db/connection.js";
import dayjs from 'dayjs';

export class AppointmentService {

    static async getClientByDocument(clientData) {
        const clientBD = await pool.connect();
        return await UserRepository.findByDocument(clientData, clientBD);
    }
}