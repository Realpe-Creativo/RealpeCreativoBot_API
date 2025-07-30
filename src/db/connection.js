import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    max: Number.parseInt(process.env.DB_MAX_CONNECTIONS) || 20,
    idleTimeoutMillis: Number.parseInt(process.env.DB_IDLE_TIMEOUT) || 60000,
    connectionTimeoutMillis: Number.parseInt(process.env.DB_CONNECTION_TIMEOUT) || 10000,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ PostgreSQL connected successfully");
        const result = await client.query("SELECT NOW()");
        console.log("🕒 Current DB time:", result.rows[0].now);
        client.release();
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        throw error;
    }
};

export { pool };
