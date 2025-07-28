import { ProfessionalService } from "../services/professionalService.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";

export class ProfessionalController {

    static async getProfessionalById(req, res) {

        try {
            const id = req.params.id;

            const professional = await ProfessionalService.getProfessionalById({
                id: id
            });

            if (professional == null) {
                return res.status(404).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Professional not found.",
                    success: false,
                    data: null
                })
            }

            return res.status(200).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Professional found.",
                success: true,
                data: professional
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

    static async getProfessionalSearch(req, res) {

        try {

            const { id, occupation, number } = req.query;

            if (typeof id !== 'string' || id.trim() === '') {
                return res.status(404).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Field 'id' is required and must be a non-empty.",
                    success: false,
                    data: null
                })
            }

            if (typeof occupation !== 'string' || occupation.trim() === '') {
                return res.status(404).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Field 'occupation' is required and must be a non-empty.",
                    success: false,
                    data: null
                })
            }

            if (typeof number !== 'string' || number.trim() === '') {
                return res.status(404).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Field 'number' is required and must be a non-empty.",
                    success: false,
                    data: null
                })
            }

            const professional = await ProfessionalService.getProfessionalByFilters(
                {
                    id: id,
                    occupation: occupation,
                    number: number
                }
            );

            if (professional == null) {
                return res.status(404).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Professional not found.",
                    success: false,
                    data: null
                })
            }

            return res.status(200).json({
                code_response: CodeResponse.CODE_SUCCESS,
                message: "Professional found.",
                success: true,
                data: professional
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
}