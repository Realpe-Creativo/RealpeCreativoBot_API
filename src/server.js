import "express-async-errors";

import { connectDB } from "./db/connection.js";
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

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("👋 SIGINT received, shutting down gracefully");
  process.exit(0);
});

startServer();