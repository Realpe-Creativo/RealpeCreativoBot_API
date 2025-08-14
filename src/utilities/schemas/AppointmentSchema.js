import Joi from "joi";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);
const dateTimeFormat = 'DD/MM/YYYY HH:mm';

const AppointmentSchema = Object.freeze({
    CREATE_APPOINTMENT_SCHEMA: Joi.object({
        client_id: Joi.string()
            .pattern(/^\d+$/)
            .max(8)
            .required()
            .messages({
                'string.pattern.base': 'The client_id must be numeric.',
                'string.max': 'The maximum length of client_id is 8 characters.',
                'any.required': 'The client_id is required.'
            }),
        start_date_time: Joi.string()
            .required()
            .custom((value, helpers) => {
                const validDate = dayjs(value, dateTimeFormat, true).isValid();
                if (!validDate) {
                    return helpers.error('date.invalid');
                }
                return value;
            })
            .messages({
                'string.base': 'Start date must be a string.',
                'any.required': 'Start date is required.',
                'date.invalid': `Start date must be in the format ${dateTimeFormat} and valid.`
            }),
        end_date_time: Joi.string()
            .required()
            .custom((value, helpers) => {

                const { start_date_time } = helpers.state.ancestors[0];
                console.log(start_date_time);

                const start = dayjs(start_date_time, dateTimeFormat, true);
                const end = dayjs(value, dateTimeFormat, true);

                if (!end.isValid()) {
                    return helpers.error('date.invalid');
                }

                if (!start.isValid()) {
                    return helpers.error('date.start_invalid');
                }

                if (!end.isAfter(start)) {
                    return helpers.error('date.end_before_start');
                }

                return value;
            })
            .messages({
                'string.base': 'End date must be a string.',
                'any.required': 'End date is required.',
                'date.invalid': `End date must be in format ${dateTimeFormat} and valid.`,
                'date.start_invalid': 'Start date is invalid.',
                'date.end_before_start': 'End date must be after start date.'
            }),
        google_calendar_event_id: Joi.string().max(255).required(),
        google_calendar_url_event: Joi.string().required(),
        current_state_id: Joi.string()
            .pattern(/^\d+$/)
            .max(8)
            .required()
            .messages({
                'string.pattern.base': 'The current_state_id must be numeric.',
                'string.max': 'The maximum length of current_state_id is 8 characters.',
                'any.required': 'The current_state_id is required.'
            }),
        observations: Joi.string().required()
    }),
    UPDATE_APPOINTMENT_SCHEMA: Joi.object({
        appointment_id: Joi.string()
            .pattern(/^\d+$/)
            .max(8)
            .required()
            .messages({
                'string.pattern.base': 'The appointment_id must be numeric.',
                'string.max': 'The maximum length of appointment_id is 8 characters.',
                'any.required': 'The appointment_id is required.'
            }),
        client_id: Joi.string()
            .pattern(/^\d+$/)
            .max(8)
            .required()
            .messages({
                'string.pattern.base': 'The client_id must be numeric.',
                'string.max': 'The maximum length of client_id is 8 characters.',
                'any.required': 'The client_id is required.'
            }),
        start_date_time: Joi.string()
            .required()
            .custom((value, helpers) => {
                const validDate = dayjs(value, dateTimeFormat, true).isValid();
                if (!validDate) {
                    return helpers.error('date.invalid');
                }
                return value;
            })
            .messages({
                'string.base': 'Start date must be a string.',
                'any.required': 'Start date is required.',
                'date.invalid': `Start date must be in the format ${dateTimeFormat} and valid.`
            }),
        end_date_time: Joi.string()
            .required()
            .custom((value, helpers) => {

                const { start_date_time } = helpers.state.ancestors[0];
                console.log(start_date_time);

                const start = dayjs(start_date_time, dateTimeFormat, true);
                const end = dayjs(value, dateTimeFormat, true);

                if (!end.isValid()) {
                    return helpers.error('date.invalid');
                }

                if (!start.isValid()) {
                    return helpers.error('date.start_invalid');
                }

                if (!end.isAfter(start)) {
                    return helpers.error('date.end_before_start');
                }

                return value;
            })
            .messages({
                'string.base': 'End date must be a string.',
                'any.required': 'End date is required.',
                'date.invalid': `End date must be in format ${dateTimeFormat} and valid.`,
                'date.start_invalid': 'Start date is invalid.',
                'date.end_before_start': 'End date must be after start date.'
            }),
        google_calendar_event_id: Joi.string().max(255).required(),
        google_calendar_url_event: Joi.string().required(),
        current_state_id: Joi.string()
            .pattern(/^\d+$/)
            .max(8)
            .required()
            .messages({
                'string.pattern.base': 'The current_state_id must be numeric.',
                'string.max': 'The maximum length of current_state_id is 8 characters.',
                'any.required': 'The current_state_id is required.'
            }),
        observations: Joi.string().required()
    }),
    UPDATE_STATUS_SCHEMA: Joi.object({
        appointment_id: Joi.string()
            .pattern(/^\d+$/)
            .max(8)
            .required()
            .messages({
                'string.pattern.base': 'The appointment_id must be numeric.',
                'string.max': 'The maximum length of appointment_id is 8 characters.',
                'any.required': 'The appointment_id is required.'
            }),
        current_state_id: Joi.string()
            .pattern(/^\d+$/)
            .max(8)
            .required()
            .messages({
                'string.pattern.base': 'The current_state_id must be numeric.',
                'string.max': 'The maximum length of current_state_id is 8 characters.',
                'any.required': 'The current_state_id is required.'
            })
    })
});

export default AppointmentSchema;