import { pool } from "../db/connection.js"
import Queries from "../utilities/constants/Queries.js";

export class ProductProfessionalRepository {

    static async isProfessionalLinkedToProduct(clientData) {
        const values = [
            clientData.professional_id,
            clientData.product_id
        ];

        // const executor = clientBD || pool;
        const result = await pool.query(Queries.PRODUCT_PROFESSIONAL_EXISTS, values);
        return result.rows[0].exists;
    }

    static async getProfessionalsByProduct(clientData) {
        const values = [
            clientData.id
        ]
        // const executor = clientBD || pool;
        const result = await pool.query(Queries.PRODUCT_PROFESSIONAL_BY_PRODUCT, values);
        return result.rows || null;
    }

    static async getProductsByProfessional(clientData) {
        const values = [
            clientData.id
        ]
        // const executor = clientBD || pool;
        const result = await pool.query(Queries.PRODUCT_PROFESSIONAL_BY_PROFESSIONAL, values);
        return result.rows || null;
    }

}