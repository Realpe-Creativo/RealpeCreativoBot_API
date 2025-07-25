import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import clientsRoutes from "./routes/clientsRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

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
    const fs = require('fs');
    const path = require('path');
    const accessLogStream = fs.createWriteStream(
        path.join(__dirname, 'access.log'),
        { flags: 'a' }
    );
    app.use(morgan('combined', { stream: accessLogStream }));
}

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
    })
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientsRoutes);
// app.use("/api/usuarios", usuariosRoutes);

// app.use("/api/profesionales", profesionalesRoutes);
// app.use("/api/productos", productosRoutes);
// app.use("/api/citas", citasRoutes);
// app.use("/api/estado-chat", estadoChatRoutes);
// app.use("/api/estado-cita", estadoCitaRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
