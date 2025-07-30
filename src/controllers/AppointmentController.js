import { AppointmentService } from "../services/AppointmentService.js";
import AppointmentSchema from "../utilities/schemas/ClientSchema.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";

export class AppointmentController {

    static async getAppointmentById(req, res) {
        console.log(req.body); // Crear tabla de logs
        const { error } = ClientSchema.GET_CLIENT_SCHEMA.validate(req.body);

        if (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.details[0].message,
                success: false,
                data: null
            })
        }

        try {
            const client = await ClientService.getClientByDocument(req.body);

            if (client == null) {
                return res.status(404).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Client not found.",
                    success: false,
                    data: null
                })
            }

            // Calcula la edad para enviarla
            const fechaNacimiento = new Date(client.date_of_birth);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

            if (
                hoy.getMonth() < fechaNacimiento.getMonth() ||
                (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())
            ) {
                edad--;
            }

            const clientModified = {};

            for (const [clave, valor] of Object.entries(client)) {
                clientModified[clave] = valor;
                if (clave === "date_of_birth") {
                    const dateBD = new Date(valor);
                    clientModified["date_of_birth"] = dateBD.toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    clientModified["age"] = edad;
                }

            }

            return res.status(200).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Client found.",
                success: true,
                data: clientModified
            })

        } catch (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                error: error.message,
                success: false,
                data: null
            })
        }
    }

}