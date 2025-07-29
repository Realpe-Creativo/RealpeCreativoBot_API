import Joi from "joi";

const ChatStatusSchema = Object.freeze({
    CREATE_CHAT_STATUS_SCHEMA: Joi.object({
        numero: Joi.string().max(15).required(),
        estado: Joi.object().required(),
    }),
    UPDATE_CHAT_STATUS_SCHEMA: Joi.object({
        estado: Joi.object().required(),
    }),
});
export default ChatStatusSchema;