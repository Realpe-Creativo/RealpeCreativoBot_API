import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class ClientRepository {

    static async findById(clientData, clientBD) {
        const values = [
            clientData.document_type,
            clientData.document_number
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.CLIENT_FIND_BY_DOCUMENT, values);
        return result.rows[0] || null;
    }

    static async create(clientData, clientBD) {

        const values = [
            clientData.usuario_id,
            clientData.nombre_acudiente,
            clientData.fecha_nacimiento,
            clientData.barrio,
            clientData.direccion,
            clientData.remitido_institucion,
            clientData.institucion_educativo
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.CLIENT_CREATE, values);
        return result.rows[0];
    }
}
