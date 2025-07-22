import jwt from "jsonwebtoken";
import { pool } from "../db/connection.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";
import Queries from "../utilities/constants/Queries.js";

export const authenticate = async (req, res, next) => {
    console.log(req.body)
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                error: "Access denied. No token provided.",
            })
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Verify user still exists and is active
            // const query = "SELECT id, email, activo FROM usuarios WHERE id = $1 AND activo = true"
            const result = await pool.query(Queries.AUTH_LOGIN_FIND_BY_LOGIN, [decoded.login])

            if (result.rows.length === 0) {
                return res.status(401).json({
                    code_response: CodeResponse.CODE_FAILED,
                    message: "Token is no longer valid.",
                    success: false,
                    data: null,
                })
            }

            req.user = {
                id: decoded.id,
                login: decoded.login,
                rol: decoded.rol,
                ...result.rows[0],
            }

            next();
        } catch (jwtError) {
            return res.status(401).json({
                code_response: CodeResponse.CODE_FAILED,
                message: "Invalid token.",
                success: false,
                data: null,
            })
        }
    } catch (error) {
        console.error("Authentication middleware error:", error)
        res.status(500).json({
            code_response: CodeResponse.CODE_FAILED,
            message: "Server error during authentication.",
            success: false,
            data: null,
        })
    }
}

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: "Access denied. Authentication required.",
            })
        }

        if (roles.length && !roles.includes(req.user.tipo_usuario)) {
            return res.status(403).json({
                success: false,
                error: "Access denied. Insufficient permissions.",
            })
        }

        next()
    }
}
