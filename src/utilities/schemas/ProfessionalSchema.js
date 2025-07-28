import Joi from "joi";
import ClientSchema from "./ClientSchema.js";

const ProfessionalSchema = Object.freeze({
    GET_PROFESSIONAL_SCHEMA: Joi.object({
        id: Joi.string().max(8).required(),
        whatsapp_number: Joi.string().max(15).required(),
        occupation: Joi.string().max(200).required(),
    })
});

export default ProfessionalSchema;