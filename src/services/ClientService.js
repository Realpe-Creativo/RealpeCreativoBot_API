import { ClientRepository } from "../repositories/ClientRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { pool } from "../db/connection.js";
import dayjs from 'dayjs';

export class ClientService {

    static async getClientByDocument(clientData) {
        // const clientBD = await pool.connect();
        return await UserRepository.findByDocument(clientData);
    }

    static async createClient(clientData) {
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            // Create usuario
            const usuario = await UserRepository.create({
                nombres: clientData.names,
                apellidos: clientData.last_names,
                tipo_documento: clientData.document_type,
                numero_documento: clientData.document_number,
                email: clientData.email,
                celular: clientData.cellphone_number,
                tipo_usuario: "CLIENT",
                activo: true
            }, clientBD);

            // Create cliente
            const cliente = await ClientRepository.create({
                user_id: usuario.id,
            }, clientBD);

            // Obtiene usuario-cliente
            const clienteDetalle = await ClientRepository.findById({
                document_number: clientData.document_number
            }, clientBD);

            if (clienteDetalle == null) {
                throw new Error("Ocurrio un error creando el cliente.");
            }

            await clientBD.query("COMMIT");
            return clienteDetalle;
        } catch (error) {
            await clientBD.query("ROLLBACK");
            throw error;
        } finally {
            clientBD.release();
        }
    }

    static async updateClient(clientData, clientFound) {
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            // Valida si hay cambios para el usuario
            if (clientData.document_type !== clientFound.document_type
                    || clientData.names !== clientFound.names
                    || clientData.last_names !== clientFound.last_names
                    || clientData.email !== clientFound.email
                    || clientData.cellphone_number !== clientFound.cellphone_number) {
                // Update usuario
                const userUpdated = await UserRepository.update({
                    user_id: clientData.id,
                    numero_documento: clientData.document_number,
                    tipo_documento: clientData.document_type,
                    nombres: clientData.names,
                    apellidos: clientData.last_names,
                    email: clientData.email,
                    celular: clientData.cellphone_number
                }, clientBD);
            }

            // Valida si hay cambios para el cliente
            if (clientData.guardian_name !== clientFound.guardian_name
                || clientData.date_of_birth !== clientFound.date_of_birth
                || clientData.neighborhood !== clientFound.neighborhood
                || clientData.address !== clientFound.address
                || clientData.sent_by_institution !== clientFound.sent_by_institution
                || clientData.institution !== clientFound.institution) {
                // Update cliente
                const clientUpdated = await ClientRepository.update({
                    user_id: clientData.id,
                    guardian_name: clientData.guardian_name,
                    date_of_birth: dayjs(clientData.date_of_birth, "DD/MM/YYYY").format("YYYY-MM-DD"),
                    neighborhood: clientData.neighborhood,
                    address: clientData.address,
                    sent_by_institution: clientData.sent_by_institution,
                    institution: clientData.institution
                }, clientBD);
            }

            // Obtiene usuario-cliente
            const clientDetail = await ClientRepository.findById({
                document_number: clientData.document_number
            }, clientBD);

            if (clientDetail == null) {
                throw new Error("Ocurrio un error creando el cliente.");
            }

            await clientBD.query("COMMIT");
            return clientDetail;
        } catch (error) {
            await clientBD.query("ROLLBACK");
            throw error;
        } finally {
            clientBD.release();
        }
    }

}
