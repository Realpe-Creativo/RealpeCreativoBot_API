import { ClientRepository } from "../repositories/clientRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { pool } from "../db/connection.js";

export class ClientService {

    static async getClienteById(id) {
        const cliente = await Client.findById(id)
        if (!cliente) {
            throw new Error("Client not found");
        }
        return cliente;
    }

    static async getClientByDocument(clientData) {
        return await User.findByDocument(clientData);
    }

    static async createCliente(clientData) {
        console.log('Ok...');
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            // Create usuario first
            const usuario = await User.create({
                nombres: clientData.names,
                apellidos: clientData.last_names,
                tipo_documento: clientData.document_type,
                numero_documento: clientData.document_number,
                email: clientData.email,
                celular: clientData.cellphone_number,
                tipo_usuario: "CLIENT",
                activo: true
            }, clientBD);

            console.log("User creado : " + usuario.toString());

            // Create cliente
            const cliente = await Client.create({
                usuario_id: usuario.id,
                nombre_acudiente: clientData.guardian_name,
                fecha_nacimiento: clientData.date_of_birth,
                barrio: clientData.neighborhood,
                direccion: clientData.address,
                remitido_institucion: clientData.sent_by_institution,
                institucion_educativo: clientData.institution
            }, clientBD);

            console.log("Client creado : " + cliente.toString());

            await clientBD.query("COMMIT");
            return await Client.findById(cliente.id);
        } catch (error) {
            console.log("Ocurrio un error : " + error);
            await clientBD.query("ROLLBACK");
            throw error;
        } finally {
            clientBD.release();
        }
    }

    static async updateCliente(id, clienteData) {
        const cliente = await Client.update(id, clienteData)
        if (!cliente) {
            throw new Error("Client not found")
        }
        return await Client.findById(id)
    }

    static async deleteCliente(id) {
        const cliente = await Client.findById(id)
        if (!cliente) {
            throw new Error("Client not found")
        }

        // Soft delete the associated usuario
        await User.softDelete(cliente.usuario_id)

        return { message: "Client deleted successfully" }
    }
}
