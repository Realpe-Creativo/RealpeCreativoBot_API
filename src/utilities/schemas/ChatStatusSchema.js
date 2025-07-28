import Joi from "joi";

const ChatStatusSchema = Object.freeze({
    CREATE_CHAT_STATUS_SCHEMA: Joi.object({
        numero: Joi.string().max(15).required(),
        estado: Joi.string().max(20).required(),
    }),
    UPDATE_CHAT_STATUS_SCHEMA: Joi.object({
        estado: Joi.string().max(20).required(),
    }),
});
export default ChatStatusSchema;