import Joi from "joi"
import { AuthService } from "../services/AuthService.js"
import { loginSchema, registerSchema } from "../utilities/schemas/AuthSchema.js"
import CodeResponse from "../utilities/constants/CodeResponse.js";

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
})

export class AuthController {
    static async getToken(req, res) {

        console.log(`[${req.requestId}] Ingresa en AuthController.getToken`);

        const { error } = loginSchema.validate(req.body);

        if (error) {
            console.log(`[${req.requestId}] Ocurrio un error en la validacion de la estructura de la peticion : ${error.details[0].message}}`);
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.details[0].message,
                success: false,
                data: null,
            })
        }

        try {
            const result = await AuthService.getToken(req);

            console.log(`[${req.requestId}] Se obtuvo respuesta exitosa.`);
            res.status(200).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Login successful",
                success: true,
                data: result,
            })
        } catch (error) {
            res.status(401).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.message,
                success: false,
                data: null,
            })
        }
    }

    static async register(req, res) {
        const { error } = registerSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.details[0].message,
                success: false,
                data: null,
            })
        }

        try {
            const result = await AuthService.register(req.body)

            res.status(201).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Registration successful",
                success: true,
                data: result,
            })
        } catch (error) {
            res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.message,
                success: false,
                data: null,
            })
        }
    }

    static async refreshToken(req, res) {
        const { error } = refreshTokenSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                error: error.details[0].message,
            })
        }

        try {
            const { refreshToken } = req.body
            const result = await AuthService.refreshToken(refreshToken)

            res.status(200).json({
                success: true,
                message: "Token refreshed successfully",
                data: result,
            })
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message,
            })
        }
    }

    static async getProfile(req, res) {
        res.status(200).json({
            success: true,
            data: req.user,
        })
    }
}
