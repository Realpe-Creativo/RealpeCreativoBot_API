import Joi from "joi";

export const loginSchema = Joi.object({
    login: Joi.string().required().max(50),
    password: Joi.string().min(6).required(),
})

export const registerSchema = Joi.object({
    login: Joi.string().required().max(50),
    password: Joi.string().required().min(6),
    rol: Joi.string().valid("ADMIN", "CONSULTA").required()
})
