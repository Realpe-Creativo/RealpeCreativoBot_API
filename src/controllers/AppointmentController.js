import { AppointmentService } from "../services/AppointmentService.js";
import AppointmentSchema from "../utilities/schemas/AppointmentSchema.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";
import dayjs from "dayjs";
import {ProductProfessionalService} from "../services/ProductProfessionalService.js";

export class AppointmentController {

    static async getAppointmentById(req, res) {

        try {
            const { id } = req.query;
            console.log(`id recibido ${id}`)

            const appointmentFound = await AppointmentService.getAppointmentId({
                appointment_id: id
            });

            if (appointmentFound == null) {
                return res.status(404).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "No data found.",
                    success: false,
                    data: null
                });
            }

            // Build response
            const dataResponse = {
                id: appointmentFound.appointment_id,
                start_date_time: dayjs(appointmentFound.start_date_time).format("DD/MM/YYYY HH:mm"),
                end_date_time: dayjs(appointmentFound.end_date_time).format("DD/MM/YYYY HH:mm"),
                client: {
                    id: appointmentFound.client_id,
                    names: appointmentFound.client_names,
                    last_names: appointmentFound.client_last_names,
                    document_type: appointmentFound.client_document_type,
                    document_number: appointmentFound.client_document_number,
                    email: appointmentFound.client_email,
                    cellphone: appointmentFound.client_cellphone
                },
                product: {
                    id: appointmentFound.product_id,
                    name: appointmentFound.product_name,
                    description: appointmentFound.product_description,
                    scheduled_by_bot: appointmentFound.product_scheduled_by_bot,
                    duration: appointmentFound.product_duration
                },
                assigned_professional: {
                    id: appointmentFound.professional_id,
                    names: appointmentFound.professional_names,
                    last_names: appointmentFound.professional_last_names,
                    document_type: appointmentFound.professional_document_type,
                    document_number: appointmentFound.professional_document_number,
                    email: appointmentFound.professional_email,
                    cell_phone: appointmentFound.professional_cellphone,
                    occupation: appointmentFound.professional_occupation,
                    whatsapp_number: appointmentFound.professional_whatsapp
                },
                google_calendar_event_id: appointmentFound.google_calendar_event_id,
                google_calendar_event_url: appointmentFound.google_calendar_event_url,
                current_state: {
                    code: appointmentFound.status_code,
                    description: appointmentFound.status_description,
                    appointment_id: appointmentFound.appointment_id,
                    register_date: dayjs(appointmentFound.status_creation_date).format("DD/MM/YYYY HH:mm")
                },
                observations: appointmentFound.observations
            }

            return res.status(200).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Query successfully.",
                success: true,
                data: dataResponse
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

            const result = [];
            resultAppointments.forEach(r => {
                result.push({
                    cita : {
                        id: r.appointment_id,
                        fecha_hora_inicio: r.start_date_time,
                        fecha_hora_fin: r.end_date_time,
                        observaciones: r.observations,
                        google_calendar_event_id: r.google_calendar_event_id,
                        google_calendar_url_event: r.google_calendar_event_url,
                        estado_actual_id: r.status_code,
                        estado_actual: r.status_description
                    },
                    cliente : {
                        id: r.client_id,
                        nombres: r.client_names,
                        apellidos: r.client_last_names,
                        tipo_documento: r.client_document_type,
                        numero_documento: r.client_document_number,
                        email: r.client_email,
                        celular: r.client_cellphone,
                        edad: 25,
                        fecha_nacimiento: r.client_date_of_birth,
                        barrio: r.client_neighborhood,
                        direccion: r.client_address,
                        remitido_institucion: r.client_sent_by_institution,
                        colegio: r.client_institution
                    },
                    profesional : {
                        id: r.professional_id,
                        nombres: r.professional_names,
                        apellidos: r.professional_last_names,
                        email: r.professional_email,
                        cargo: r.professional_occupation,
                        numero_whatsapp: r.professional_whatsapp
                    },
                    producto : {
                        id: r.product_id,
                        nombre: r.product_name,
                        descripcion: r.product_description,
                        duracion_minutos: r.product_duration
                    }
                })
            });

            return res.status(200).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Query successfully.",
                success: true,
                data: result
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
            // Valida relacion de profesional y producto
            const relationExists = await ProductProfessionalService.isProfessionalLinkedToProduct(req.body);

            if (!relationExists) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: `The product ${req.body.product_id} doesn't have relation with the professional ${req.body.professional_id}.`,
                    success: false,
                    data: null
                });
            }

            const appointment = await AppointmentService.createAppointment(req.body);

            if (appointment == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Appointment not created.",
                    success: false,
                    data: null
                })
            }

            // Query for professionals by product id
            // const professionalsFound = await ProductProfessionalService.findProfessionalsByProduct(req.body);

            // const professionalsList = []
            // if (professionalsFound != null) {
            //     professionalsFound.forEach(p => {
            //         professionalsList.push({
            //             id: p.professional_id,
            //             names: p.professional_names,
            //             last_names: p.professional_last_names,
            //             document_type: p.professional_document_type,
            //             document_number: p.professional_document_number,
            //             email: p.professional_email,
            //             cell_phone: p.professional_cell_phone,
            //             occupation: p.professional_occupation,
            //             whatsapp_number: p.professional_whatsapp
            //         })
            //     });
            // }

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
                    scheduled_by_bot: appointment.product_scheduled_by_bot,
                    duration: appointment.product_duration
                },
                assigned_professional: {
                    id: appointment.professional_id,
                    names: appointment.professional_names,
                    last_names: appointment.professional_last_names,
                    document_type: appointment.professional_document_type,
                    document_number: appointment.professional_document_number,
                    email: appointment.professional_email,
                    cell_phone: appointment.professional_cellphone,
                    occupation: appointment.professional_occupation,
                    whatsapp_number: appointment.professional_whatsapp
                },
                google_calendar_event_id: appointment.google_calendar_event_id,
                google_calendar_event_url: appointment.google_calendar_event_url,
                current_state: {
                    code: appointment.status_code,
                    description: appointment.status_description,
                    appointment_id: appointment.appointment_id,
                    register_date: dayjs(appointment.status_creation_date).format("DD/MM/YYYY HH:mm")
                },
                observations: appointment.observations
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

    static async updateAppointment(req, res) {

        const {error} = AppointmentSchema.UPDATE_APPOINTMENT_SCHEMA.validate(req.body);

        if (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.details[0].message,
                success: false,
                data: null
            })
        }

        try {

            // Valida relacion de profesional y producto
            const relationExists = await ProductProfessionalService.isProfessionalLinkedToProduct(req.body);

            if (!relationExists) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: `The product ${req.body.product_id} doesn't have relation with the professional ${req.body.professional_id}.`,
                    success: false,
                    data: null
                });
            }

            // Valida si existe el cliente y concuerda con datos id y document_number
            const appointmentFound = await AppointmentService.getAppointmentId(req.body);

            if (appointmentFound == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: `Appointment with id ${req.body.appointment_id} not found.`,
                    success: false,
                    data: null
                });
            }

            const appointmentUpdated = await AppointmentService.updateAppointment(req.body);

            if (appointmentUpdated == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Appointment information not updated.",
                    success: false,
                    data: null
                })
            }

            // Build response
            const dataResponse = {
                id: appointmentUpdated.appointment_id,
                start_date_time: dayjs(appointmentUpdated.start_date_time).format("DD/MM/YYYY HH:mm"),
                end_date_time: dayjs(appointmentUpdated.end_date_time).format("DD/MM/YYYY HH:mm"),
                client: {
                    id: appointmentUpdated.client_id,
                    names: appointmentUpdated.client_names,
                    last_names: appointmentUpdated.client_last_names,
                    document_type: appointmentUpdated.client_document_type,
                    document_number: appointmentUpdated.client_document_number,
                    email: appointmentUpdated.client_email,
                    cellphone: appointmentUpdated.client_cellphone
                },
                product: {
                    id: appointmentUpdated.product_id,
                    name: appointmentUpdated.product_name,
                    description: appointmentUpdated.product_description,
                    scheduled_by_bot: appointmentUpdated.product_scheduled_by_bot,
                    duration: appointmentUpdated.product_duration
                },
                assigned_professional: {
                    id: appointmentUpdated.professional_id,
                    names: appointmentUpdated.professional_names,
                    last_names: appointmentUpdated.professional_last_names,
                    document_type: appointmentUpdated.professional_document_type,
                    document_number: appointmentUpdated.professional_document_number,
                    email: appointmentUpdated.professional_email,
                    cell_phone: appointmentUpdated.professional_cellphone,
                    occupation: appointmentUpdated.professional_occupation,
                    whatsapp_number: appointmentUpdated.professional_whatsapp
                },
                google_calendar_event_id: appointmentUpdated.google_calendar_event_id,
                google_calendar_event_url: appointmentUpdated.google_calendar_event_url,
                current_state: {
                    code: appointmentUpdated.status_code,
                    description: appointmentUpdated.status_description,
                    appointment_id: appointmentUpdated.appointment_id,
                    register_date: dayjs(appointmentUpdated.status_creation_date).format("DD/MM/YYYY HH:mm")
                },
                observations: appointmentUpdated.observations
            }

            return res.status(201).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Appointment information updated successfully.",
                success: true,
                data: dataResponse
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

    static async updateStatusAppointment(req, res) {

        const { error } = AppointmentSchema.UPDATE_STATUS_SCHEMA.validate(req.body);

        if (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.details[0].message,
                success: false,
                data: null
            })
        }

        try {

            // Valida si existe el cliente y concuerda con datos id y document_number
            const appointmentFound = await AppointmentService.getAppointmentId(req.body);

            if (appointmentFound == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: `Appointment with id ${req.body.appointment_id} not found.`,
                    success: false,
                    data: null
                });
            }

            const appointmentUpdated = await AppointmentService.updateStatusAppointment(req.body);

            if (appointmentUpdated == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Appointment information not updated.",
                    success: false,
                    data: null
                })
            }

            // Build response
            const dataResponse = {
                id: appointmentUpdated.appointment_id,
                start_date_time: dayjs(appointmentUpdated.start_date_time).format("DD/MM/YYYY HH:mm"),
                end_date_time: dayjs(appointmentUpdated.end_date_time).format("DD/MM/YYYY HH:mm"),
                client: {
                    id: appointmentUpdated.client_id,
                    names: appointmentUpdated.client_names,
                    last_names: appointmentUpdated.client_last_names,
                    document_type: appointmentUpdated.client_document_type,
                    document_number: appointmentUpdated.client_document_number,
                    email: appointmentUpdated.client_email,
                    cellphone: appointmentUpdated.client_cellphone
                },
                product: {
                    id: appointmentUpdated.product_id,
                    name: appointmentUpdated.product_name,
                    description: appointmentUpdated.product_description,
                    scheduled_by_bot: appointmentUpdated.product_scheduled_by_bot,
                    duration: appointmentUpdated.product_duration
                },
                assigned_professional: {
                    id: appointmentUpdated.professional_id,
                    names: appointmentUpdated.professional_names,
                    last_names: appointmentUpdated.professional_last_names,
                    document_type: appointmentUpdated.professional_document_type,
                    document_number: appointmentUpdated.professional_document_number,
                    email: appointmentUpdated.professional_email,
                    cell_phone: appointmentUpdated.professional_cellphone,
                    occupation: appointmentUpdated.professional_occupation,
                    whatsapp_number: appointmentUpdated.professional_whatsapp
                },
                google_calendar_event_id: appointmentUpdated.google_calendar_event_id,
                google_calendar_event_url: appointmentUpdated.google_calendar_event_url,
                current_state: {
                    code: appointmentUpdated.status_code,
                    description: appointmentUpdated.status_description,
                    appointment_id: appointmentUpdated.appointment_id,
                    register_date: dayjs(appointmentUpdated.status_creation_date).format("DD/MM/YYYY HH:mm")
                },
                observations: appointmentUpdated.observations
            }

            return res.status(201).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Appointment information updated successfully.",
                success: true,
                data: dataResponse
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