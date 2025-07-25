import Joi from "joi";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

const ClientSchema = Object.freeze({
    GET_CLIENT_SCHEMA: Joi.object({
        document_type: Joi.string().max(3).required(),
        document_number: Joi.string().max(12).required(),
    }),
    CREATE_CLIENT_SCHEMA: Joi.object({
        names: Joi.string().max(100).required(),
        last_names: Joi.string().max(100).required(),
        document_type: Joi.string().max(3).required(),
        document_number: Joi.string().max(20).required(),
        email: Joi.string().max(255).email().required(),
        cellphone_number: Joi.string().max(15).required(),
        guardian_name: Joi.string().max(200).required(),
        date_of_birth: Joi.string()
            .pattern(dateRegex)
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

export default ClientSchema;