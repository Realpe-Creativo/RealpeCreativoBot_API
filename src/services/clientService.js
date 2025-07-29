import { ClientRepository } from "../repositories/clientRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { pool } from "../db/connection.js";
import dayjs from 'dayjs';

export class ClientService {

    static async getClientByDocument(clientData) {
        const clientBD = await pool.connect();
        return await UserRepository.findByDocument(clientData, clientBD);
    }

    static async createClient(clientData) {
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            // Create usuario first
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
                usuario_id: usuario.id,
                nombre_acudiente: clientData.guardian_name,
                fecha_nacimiento:   dayjs(clientData.date_of_birth, "DD/MM/YYYY").format("YYYY-MM-DD"),
                barrio: clientData.neighborhood,
                direccion: clientData.address,
                remitido_institucion: clientData.sent_by_institution,
                institucion_educativo: clientData.institution
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

    // static async updateCliente(id, clienteData) {
    //     const cliente = await Client.update(id, clienteData)
    //     if (!cliente) {
    //         throw new Error("Client not found")
    //     }
    //     return await Client.findById(id)
    // }
    //
    // static async deleteCliente(id) {
    //     const cliente = await Client.findById(id)
    //     if (!cliente) {
    //         throw new Error("Client not found")
    //     }
    //
    //     // Soft delete the associated usuario
    //     await User.softDelete(cliente.usuario_id)
    //
    //     return { message: "Client deleted successfully" }
    // }
}
