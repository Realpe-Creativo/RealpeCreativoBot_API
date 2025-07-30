import { ClientRepository } from "../repositories/ClientRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { AppointmentRepository } from "../repositories/AppointmentRepository.js";
import { pool } from "../db/connection.js";
import dayjs from 'dayjs';

export class AppointmentService {

    static async getClientByDocument(clientData) {
        const clientBD = await pool.connect();
        return await UserRepository.findByDocument(clientData, clientBD);
    }

    static async getAppointmentsByDate(clientData) {
        const clientBD = await pool.connect();
        return await AppointmentRepository.getAppointmentsByDate(clientData, clientBD);
    }
}