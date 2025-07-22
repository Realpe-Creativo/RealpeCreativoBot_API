import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";
import { AuthLoginRepository } from "../repositories/authLoginRepository.js";

export class AuthService {
    static generateToken(authLogin) {
        return jwt.sign(
            {
                id: authLogin.id,
                login: authLogin.login,
                rol: authLogin.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        )
    }

    static generateRefreshToken(authLogin) {
        return jwt.sign({ id: authLogin.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN })
    }

    static async getToken(login, password) {
        const user = await AuthLoginRepository.findByLogin(login);

        if (!user) {
            throw new Error(`The user ${login} doesn't exist.`);
        }

        if (user.status === false) {
            throw new Error(`The user ${login} isn't active.`);
        }

        const isValidPassword = await UserRepository.validatePassword(password, user.password);

        if (!isValidPassword) {
            throw new Error("Invalid credentials.");
        }

        // Remove password from user object
        delete user.password;

        const token = this.generateToken(user);
        const refreshToken = this.generateRefreshToken(user);

        return {
            user,
            token,
            refreshToken,
        }
    }

    static async register(authLoginData) {
        // Check if user already exists
        const existingLogin = await AuthLoginRepository.findByLogin(authLoginData.login);

        if (existingLogin) {
            throw new Error("User already exists with this login.");
        }

        const user = await AuthLoginRepository.create(authLoginData);
        const token = this.generateToken(user);
        const refreshToken = this.generateRefreshToken(user);

        return {
            user,
            token,
            refreshToken,
        }
    }

    static async refreshToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
            const user = await UserRepository.findById(decoded.userId);

            if (!user) {
                throw new Error("User not found");
            }

            const newToken = this.generateToken(user);
            const newRefreshToken = this.generateRefreshToken(user);

            return {
                user,
                token: newToken,
                refreshToken: newRefreshToken,
            }
        } catch (error) {
            throw new Error("Invalid refresh token");
        }
    }
}
