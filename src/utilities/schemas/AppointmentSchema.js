import Joi from "joi";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);
const dateTimeFormat = 'DD/MM/YYYY HH:mm';

const AppointmentSchema = Object.freeze({
    CREATE_APPOINTMENT_SCHEMA: Joi.object({
        client_id: Joi.string().pattern(/^\d{1,8}$/).required()
            .messages({
                'string.pattern.base': 'The max length of client_id is 8.'
            }),
        product_id: Joi.string().pattern(/^\d{1,8}$/).required(),
        professional_id: Joi.string().pattern(/^\d{1,8}$/).required(),
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
                const { start_date_time } = helpers.state.ancestors[3];
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
        current_state_id: Joi.string().pattern(/^\d{1,8}$/).required(),
        observations: Joi.string().required()
    }),
    UPDATE_CLIENT_SCHEMA: Joi.object({
        id: Joi.string().pattern(/^\d{1,8}$/).required(),
        document_number: Joi.string().max(20).required(),
        document_type: Joi.string().max(3).required(),
        names: Joi.string().max(100).required(),
        last_names: Joi.string().max(100).required(),
        email: Joi.string().max(255).email().required(),
        cellphone_number: Joi.string().max(15).required(),
        guardian_name: Joi.string().allow('').max(200),
        date_of_birth: Joi.string()
            .required()
            .custom((value, helpers) => {
                const validDate = dayjs(value, 'DD/MM/YYYY', true).isValid();
                if (!validDate) {
                    return helpers.error('date.invalid'); // disparamos un error personalizado
                }
                return value;
            })
            .messages({
                'string.pattern.base': 'The date of birth must be in the format DD/MM/YYYY.',
                'date.invalid': 'The date of birth must be a valid date.'
            }),
        neighborhood: Joi.string().max(100).required(),
        address: Joi.string().max(100).required(),
        sent_by_institution: Joi.bool().required(),
        institution: Joi.string().allow('').max(200)
    })
});

export default AppointmentSchema;