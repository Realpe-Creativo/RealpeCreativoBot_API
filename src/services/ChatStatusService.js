import { ChatStatusRepository } from "../repositories/ChatStatusRepository.js";
import { pool } from "../db/connection.js";

export class ChatStatusService {
    static async getChatStatusByNumber(clientData) {
        // const clientBD = await pool.connect();
        return await ChatStatusRepository.findByNumber(clientData);
    }

    static async existsByNumber(number) {
        // const clientBD = await pool.connect();
        return await ChatStatusRepository.existsByNumber(number);
    }

    static async createStatus(clientData) {
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            const chatStatus = await ChatStatusRepository.create({
                numero: clientData.numero,
                estado: clientData.estado
            }, clientBD);

            await clientBD.query("COMMIT");

            // Remove keys unused
            delete chatStatus.creation_date;
            delete chatStatus.update_date;

            return chatStatus;
        } catch (error) {
            await clientBD.query("ROLLBACK");
            throw error;
        } finally {
            clientBD.release();
        }
    }

    static async updateStatus(clientData) {
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            console.log('ESTA EN CHAT STATUS SERVICE ', JSON.stringify(clientData, null, 2));

            const chatStatus = await ChatStatusRepository.update({
                id: clientData.id,
                estado: clientData.estado
            }, clientBD);

            console.log('SALE DE ACTUALIZAR EN BD', chatStatus);

            await clientBD.query("COMMIT");

            console.log('COMMITEA', chatStatus);

            // Remove keys unused
            delete chatStatus.creation_date;
            delete chatStatus.update_date;

            return chatStatus;
        } catch (error) {
            await clientBD.query("ROLLBACK");
            console.log('ERROR', error);
            throw error;
        } finally {
            clientBD.release();
        }
    }
}