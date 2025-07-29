import { ClientService } from "../services/clientService.js";
import { UserService } from "../services/userService.js";
import ClientSchema from "../utilities/schemas/ClientSchema.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";

export class ClientsController {

    static async getClientByDocument(req, res) {
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

            // Formato del cliente
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

    static async createClient(req, res) {

        const { error } = ClientSchema.CREATE_CLIENT_SCHEMA.validate(req.body);

        if (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.details[0].message,
                success: false,
                data: null
            })
        }

        try {
            // Valida si ya existe el usuario en BD
            const userExists = await UserService.existsByDocument({
                document_number: req.body.document_number
            });

            if (userExists) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: `The client with document ${req.body.document_type} - ${req.body.document_number} already exists.`,
                    success: false,
                    data: null
                });
            }

            const client = await ClientService.createClient(req.body);

            if (client == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Client not created.",
                    success: false,
                    data: null
                })
            }

            return res.status(201).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Client created successfully",
                success: true,
                data: client
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
