import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { DatabaseHelper } from "./utilities/DatabaseHelper.js";

import authRoutes from "./routes/authRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";
import chatStatusRoutes from "./routes/chatStatusRoutes.js";
import clientsRoutes from "./routes/clientsRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import professionalsRoutes from "./routes/professionalsRoutes.js";

import { randomUUID } from 'crypto';

const app = express();



// Middlewares
app.use(express.json());

// Asignacion de ID
app.use((req, res, next) => {
    req.requestId = randomUUID();
    console.log(`[${req.requestId}] New request: ${req.method} ${req.url}`);
    next();
});

// Security middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
    }),
)

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
    }),
)

app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
    windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const accessLogStream = fs.createWriteStream(
        path.join(__dirname, 'access.log'),
        { flags: 'a' }
    );
    app.use(morgan('combined', { stream: accessLogStream }));
}

// Health check endpoint mejorado
app.get("/health", async (req, res) => {
    try {
        const dbHealth = await DatabaseHelper.checkHealth();
        const poolStats = DatabaseHelper.getPoolStats();

        const healthStatus = {
            status: dbHealth ? "OK" : "ERROR",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
            database: {
                connected: dbHealth,
                pool: {
                    total: poolStats.totalCount,
                    idle: poolStats.idleCount,
                    waiting: poolStats.waitingCount
                }
            },
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
            }
        };

        const statusCode = dbHealth ? 200 : 503;
        res.status(statusCode).json(healthStatus);
    } catch (error) {
        res.status(503).json({
            status: "ERROR",
            timestamp: new Date().toISOString(),
            error: error.message
        });
    }
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/chat-status", chatStatusRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/professionals", professionalsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;