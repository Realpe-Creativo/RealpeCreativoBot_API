import { AppointmentService } from "../services/AppointmentService.js";
import AppointmentSchema from "../utilities/schemas/AppointmentSchema.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";
import dayjs from "dayjs";

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

    static async getAppointmentsByDate(req, res) {

        try {
            const { start_date, end_date } = req.query;

            if (start_date === undefined || start_date === "" ) {
                return res.status(400).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Param start_date is required.",
                    success: false,
                    data: null
                });
            } else {
                const validStartDate = dayjs(start_date, "DD/MM/YYYY", true).isValid();
                if (!validStartDate) {
                    return res.status(400).json({
                        code_response: CodeResponse.CODE_FAILED,
                        message: "Param start_date must be in the format DD/MM/YYYY.",
                        success: false,
                        data: null
                    });
                }
            }

            if (end_date === undefined || end_date === '' ) {
                return res.status(400).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Param end_date is required.",
                    success: false,
                    data: null
                })
            } else {
                const validEndDate = dayjs(end_date, "DD/MM/YYYY", true).isValid();
                if (!validEndDate) {
                    return res.status(400).json({
                        code_response: CodeResponse.CODE_FAILED,
                        message: "Param end_date must be in the format DD/MM/YYYY.",
                        success: false,
                        data: null
                    });
                }
            }

            const resultAppointments = await AppointmentService.getAppointmentsByDate({
                start_date,
                end_date
            });

            if (resultAppointments == null) {
                return res.status(404).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "No data found.",
                    success: false,
                    data: null
                });
            }

            return res.status(200).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Query successfully.",
                success: true,
                data: resultAppointments
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

    static async createAppointment(req, res) {

        const { error } = AppointmentSchema.CREATE_APPOINTMENT_SCHEMA.validate(req.body);

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
            // const userExists = await UserService.existsByDocument({
            //     document_number: req.body.document_number
            // });
            //
            // if (userExists) {
            //     return res.status(401).json({
            //         code_response: CodeResponse.CODE_FAILED,
            //         message: `The client with document ${req.body.document_type} - ${req.body.document_number} already exists.`,
            //         success: false,
            //         data: null
            //     });
            // }
            //
            // const client = await ClientService.createClient(req.body);
            //
            // if (client == null) {
            //     return res.status(401).json({
            //         code_response: CodeResponse.CODE_FAILED,
            //         message: "Client not created.",
            //         success: false,
            //         data: null
            //     })
            // }
            //
            // // Cambia formato de fecha
            // const dateBD = new Date(client.date_of_birth);
            // client["date_of_birth"] = dateBD.toLocaleDateString('es-CO', {
            //     day: '2-digit',
            //     month: '2-digit',
            //     year: 'numeric',
            // });

            return res.status(201).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Appointment created successfully.",
                success: true,
                data: "Todo OK..."
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