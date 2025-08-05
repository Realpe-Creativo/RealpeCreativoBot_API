import { pool } from '../db/connection.js';

/**
 * Helper para ejecutar consultas de base de datos de forma segura
 */
export class DatabaseHelper {

    /**
     * Ejecuta una consulta simple usando el pool directamente
     * @param {string} query - Query SQL
     * @param {Array} values - Parámetros de la query
     * @returns {Promise} Resultado de la query
     */
    static async executeQuery(query, values = []) {
        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            console.error('❌ Error ejecutando query:', error.message);
            console.error('Query:', query);
            console.error('Values:', values);
            throw error;
        }
    }

    /**
     * Ejecuta múltiples consultas en una transacción
     * @param {Function} transactionCallback - Función que recibe el cliente y ejecuta las queries
     * @returns {Promise} Resultado de la transacción
     */
    static async executeTransaction(transactionCallback) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const result = await transactionCallback(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('❌ Error en transacción:', error.message);
            throw error;
        } finally {
            client.release();
        }
    }

    /**
     * Obtiene estadísticas del pool de conexiones
     * @returns {Object} Estadísticas del pool
     */
    static getPoolStats() {
        return {
            totalCount: pool.totalCount,
            idleCount: pool.idleCount,
            waitingCount: pool.waitingCount
        };
    }

    /**
     * Verifica la salud de la conexión a la base de datos
     * @returns {Promise<boolean>} true si la conexión está funcionando
     */
    static async checkHealth() {
        try {
            const result = await pool.query('SELECT 1 as health_check');
            return result.rows[0].health_check === 1;
        } catch (error) {
            console.error('❌ Health check failed:', error.message);
            return false;
        }
    }
}