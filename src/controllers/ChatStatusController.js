import { ChatStatusService } from "../services/ChatStatusService.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";
import ChatStatusSchema from "../utilities/schemas/ChatStatusSchema.js";

export class ChatStatusController {
    static async getChatStatusByNumber(req, res) {

        try {
            const number = req.params.number;

            const chatStatus = await ChatStatusService.getChatStatusByNumber({
                number: number
            });

            if (chatStatus == null) {
                return res.status(404).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: `The chat status for the number ${number} was not found.`,
                    success: false,
                    data: null
                })
            }

            return res.status(200).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Chat status found.",
                success: true,
                data: chatStatus
            })

        } catch (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                error: error.message,
                success: false,
                data: null
            })
        }
    }

    static async createChatStatus(req, res) {

        const { error } = ChatStatusSchema.CREATE_CHAT_STATUS_SCHEMA.validate(req.body);

        if (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.details[0].message,
                success: false,
                data: null
            })
        }

        try {
            // Valida si ya existe el numero con un estado
            const chatStatusExists = await ChatStatusService.existsByNumber({
                number: req.body.number
            });

            if (chatStatusExists) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: `The number ${req.body.number} already has an status.`,
                    success: false,
                    data: null
                });
            }

            const chatStatus = await ChatStatusService.createStatus(req.body);

            if (chatStatus == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: `Chat status not created for the number ${req.body.number}.`,
                    success: false,
                    data: null
                })
            }

            return res.status(201).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: `Chat status created successfully for the number ${req.body.number}.`,
                success: true,
                data: chatStatus
            })

        } catch (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                error: error.message,
                success: false,
                data: null
            })
        }
    }

    static async updateChatStatus(req, res) {

        console.log('Request para actualizar estado_chat como JSON string:', JSON.stringify(req.body, null, 2));

        const { error } = ChatStatusSchema.UPDATE_CHAT_STATUS_SCHEMA.validate(req.body);

        if (error) {
            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                message: error.details[0].message,
                success: false,
                data: null
            })
        }

        console.log('VA POR AQUÍ');

        try {
            const number = req.params.number;
            // Valida si ya existe el numero con un estado
            const chatStatusFound = await ChatStatusService.getChatStatusByNumber({
                number: number
            });

            console.log('BUSCA EL ESTADO DEL CHAT' + chatStatusFound, number);

            if (chatStatusFound == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: `The number ${number} doesn't have an status assigned.`,
                    success: false,
                    data: null
                });
            }

            console.log('VA POR AQUÍ 1');

            const chatStatusUpdated = await ChatStatusService.updateStatus({
                id: chatStatusFound.id,
                estado: req.body.estado
            });

            if (chatStatusUpdated == null) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Status not updated.",
                    success: false,
                    data: null
                })
            }

            console.log('VA POR AQUÍ 2');

            return res.status(201).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: `Chat status updated successfully for the number ${number}.`,
                success: true,
                data: chatStatusUpdated
            })

        } catch (error) {
            console.log('ENTRA AL CATCH');

            return res.status(400).json({
                code_response: CodeResponse.CODE_FAILED,
                error: error.message,
                success: false,
                data: null
            })
        }
    }
}