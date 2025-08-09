import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class ProductRepository {

    static async getProducts() {
        // const executor = clientBD || pool;
        const result = await pool.query(Queries.PRODUCT_ALL);
        return result.rows || null;
    }

    static async findProductById(clientData) {
        const values = [
            clientData.id
        ]
        // const executor = clientBD || pool;
        const result = await pool.query(Queries.PRODUCT_BY_ID, values);
        return result.rows[0] || null;
    }
}