import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class ProductsRepository {

    static async getProducts(clientData, clientBD) {
        const executor = clientBD || pool;
        const result = await executor.query(Queries.PRODUCT_ALL);
        return result || null;
    }

    static async findProductById(clientData, clientBD) {
        const values = [
            clientData.id
        ]
        const executor = clientBD || pool;
        const result = await executor.query(Queries.PRODUCT_BY_ID, values);
        return result.rows[0] || null;
    }
}