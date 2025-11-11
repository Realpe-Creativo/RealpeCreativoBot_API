import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';

import {notFound} from "./middleware/notFound.js";
import {errorHandler} from "./middleware/errorHandler.js";
import {DatabaseHelper} from "./utilities/DatabaseHelper.js";

import authRoutes from "./routes/authRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";
import chatStatusRoutes from "./routes/chatStatusRoutes.js";
import clientsRoutes from "./routes/clientsRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";

import {randomUUID} from 'crypto';

const app = express();

// ------------------ CORS DINÁMICO ------------------
const rawOrigins = process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000';
const whitelist = rawOrigins.split(',').map(s => s.trim());

const corsOptions = {
  origin(origin, cb) {
    // Permitir herramientas sin origin (Postman) y validar los demás
    if (!origin || whitelist.includes(origin)) return cb(null, true);
    cb(new Error(`Origin no permitido por CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, // cambiar a true solo si usas cookies cross-site
};

app.use(cors(corsOptions));
// Responde preflight a todas las rutas
app.options('*', cors(corsOptions));
// ---------------------------------------------------

// Middlewares base
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true}));

// Asignación de ID único por request
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
);

app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000), // 15 min
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100),              // máx por ventana
  standardHeaders: true,   // X-RateLimit-* y Retry-After
  legacyHeaders: false,    // oculta X-RateLimit-Remaining obsoleto
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const accessLogStream = fs.createWriteStream(
      path.join(__dirname, 'access.log'),
      {flags: 'a'}
  );
  app.use(morgan('combined', {stream: accessLogStream}));
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
app.use("/api", messagesRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;