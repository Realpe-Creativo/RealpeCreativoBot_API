import "express-async-errors";

import { connectDB, closePool } from "./db/connection.js";
import dotenv from "dotenv";
import app from "./app.js";

// Load environment variables
dotenv.config();

const PROTOCOL = process.env.PROTOCOL || "http";
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 Health check: ${PROTOCOL}://${HOST}:${PORT}/health`);
      } else {
        console.log(`📊 Health check: ${PROTOCOL}://${HOST}/health`);
      }
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

const gracefulShutdown = async (signal) => {
  console.log(`👋 ${signal} received, shutting down gracefully`);
  try {
    await closePool();
    console.log("✅ Pool de conexiones cerrado correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error durante el cierre:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("UNHANDLED_REJECTION");
});

startServer();