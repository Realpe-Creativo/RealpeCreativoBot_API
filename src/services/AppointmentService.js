import { AppointmentRepository } from "../repositories/AppointmentRepository.js";
import { pool } from "../db/connection.js";
import dayjs from 'dayjs';

export class AppointmentService {

    static async getAppointmentId(clientData) {
        return await AppointmentRepository.findById(clientData);
    }

    static async getAppointmentsByDate(clientData) {
        return await AppointmentRepository.getAppointmentsByDate(clientData);
    }

    static async getAppointmentsDetailByDate(clientData) {
        return await AppointmentRepository.getAppointmentsDetailByDate(clientData);
    }

    static async createAppointment(clientData) {
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            const appointmentCreated = await AppointmentRepository.createAppointment({
                client_id: clientData.client_id,
                start_date_time: dayjs(clientData.start_date_time, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
                end_date_time: dayjs(clientData.end_date_time, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
                google_calendar_event_id: clientData.google_calendar_event_id,
                google_calendar_url_event: clientData.google_calendar_url_event,
                current_state_id: clientData.current_state_id,
                observations: clientData.observations
            }, clientBD);

            await clientBD.query("COMMIT");

            return {
                client_id: clientData.client_id,
                start_date_time: dayjs(clientData.start_date_time, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
                end_date_time: dayjs(clientData.end_date_time, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
                google_calendar_event_id: clientData.google_calendar_event_id,
                google_calendar_url_event: clientData.google_calendar_url_event,
                current_state_id: clientData.current_state_id,
                observations: clientData.observations
            };
        } catch (e) {
            await clientBD.query("ROLLBACK");
            throw e;
        } finally {
            clientBD.release();
        }
    }

    static async updateAppointment(clientData) {
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            // Actualiza y entrega el detalle de la cita
            const appointmentUpdated = AppointmentRepository.updateAppointment(
                {
                    appointment_id: clientData.appointment_id,
                    client_id: clientData.client_id,
                    start_date_time: dayjs(clientData.start_date_time, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
                    end_date_time: dayjs(clientData.end_date_time, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
                    google_calendar_event_id: clientData.google_calendar_event_id,
                    google_calendar_url_event: clientData.google_calendar_url_event,
                    current_state_id: clientData.current_state_id,
                    observations: clientData.observations
                }, clientBD
            );

            if (appointmentUpdated == null) {
                throw new Error("An error occurred while updating the appointment.");
            }

            await clientBD.query("COMMIT");
            return appointmentUpdated;
        } catch (error) {
            await clientBD.query("ROLLBACK");
            throw error;
        } finally {
            clientBD.release();
        }
    }

    static async updateStatusAppointment(clientData) {
        const clientBD = await pool.connect();

        try {
            await clientBD.query("BEGIN");

            // Actualiza y entrega el detalle de la cita
            const appointmentUpdated = AppointmentRepository.updateStatus(
                {
                    appointment_id: clientData.appointment_id,
                    current_state_id: clientData.current_state_id
                }, clientBD
            );

            if (!appointmentUpdated) {
                throw new Error("Update returned no result");
            }

            const appointmentId = appointmentUpdated.id ?? clientData.appointment_id;

            // 2) Consultar detalle usando la MISMA conexión y con await
            const appointmentDetail = await AppointmentRepository.findById(
                { appointment_id: appointmentId },
                clientBD
            );

            if (appointmentDetail == null) {
                throw new Error("An error occurred while updating the appointment.");
            }

            await clientBD.query("COMMIT");
            return appointmentDetail;
        } catch (error) {
            await clientBD.query("ROLLBACK");
            throw error;
        } finally {
            clientBD.release();
        }
    }
}