import { AppointmentService } from "../services/AppointmentService.js";
import AppointmentSchema from "../utilities/schemas/AppointmentSchema.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";
import dayjs from "dayjs";

export class AppointmentController {

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

    static async getAppointmentsDetailByDate(req, res) {

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

            const resultAppointments = await AppointmentService.getAppointmentsDetailByDate({
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
            const appointment = await AppointmentService.createAppointment({
                client_id: req.body.client_id,
                product_id: req.body.product_id,
                professional_id: req.body.professional_id,
                start_date_time: req.body.start_date_time,
                end_date_time: req.body.end_date_time,
                google_calendar_event_id: req.body.google_calendar_event_id,
                google_calendar_url_event: req.body.google_calendar_url_event,
                current_state_id: req.body.current_state_id,
                observations: req.body.observations
            });

            if (appointment == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Appointment not created.",
                    success: false,
                    data: null
                })
            }

            // Build response
            const dataResponse = {
                id: appointment.appointment_id,
                client: {
                    id: appointment.client_id,
                    names: appointment.client_names,
                    last_names: appointment.client_last_names,
                    document_type: appointment.client_document_type,
                    document_number: appointment.client_document_number,
                    email: appointment.client_email,
                    cellphone: appointment.client_cellphone
                },
                product: {
                    id: appointment.product_id,
                    name: appointment.product_name,
                    description: appointment.product_description,
                    es_agendable_por_bot: true,
                    duracion_minutos: 2147483647,
                    profesionales: []
                },
                assigned_professional: {
                    id: appointment.client_id,
                    names: appointment.client_names,
                    last_names: appointment.client_last_names,
                    document_type: appointment.client_document_type,
                    document_number: appointment.client_document_number,
                    email: appointment.client_email,
                    cellphone: appointment.client_cellphone
                },
                google_calendar_event_id: "string",
                google_calendar_url_event: "string",
                estado_actual: {
                    id: 0,
                    cita: 0,
                    estado_cita: "Agendado",
                    fecha_registro: "2025-08-02T03:33:53.139Z"
                },
                observations: "string"
            }

            return res.status(201).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Appointment created successfully.",
                success: true,
                data: dataResponse
            })

        } catch (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                error: error.message || 'Error processing the request.',
                success: false,
                data: null
            })
        }
    }
}