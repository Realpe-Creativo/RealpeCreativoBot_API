import Joi from "joi";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

const ClientSchema = Object.freeze({
    GET_CLIENT_SCHEMA: Joi.object({
        document_number: Joi.string().max(12).required(),
    }),
    CREATE_CLIENT_SCHEMA: Joi.object({
        name: Joi.string().max(100).required(),
        email: Joi.string().max(255).email().required(),
        cellphone_number: Joi.string().max(15).required()
    }),
    UPDATE_CLIENT_SCHEMA: Joi.object({
        id: Joi.string().pattern(/^\d{1,8}$/).required(),
        name: Joi.string().max(100).required(),
        email: Joi.string().max(255).email().required(),
        cellphone_number: Joi.string().max(15).required()
    })
});

export default ClientSchema;