import { ProductProfessionalRepository } from "../repositories/ProductProfessionalRepository.js";
import { pool } from "../db/connection.js";

export class ProductProfessionalService {

    static async isProfessionalLinkedToProduct(clientData) {
        // const clientBD = await pool.connect();
        return await ProductProfessionalRepository.isProfessionalLinkedToProduct({
            professional_id: clientData.professional_id,
            product_id: clientData.product_id,
        });
    }

    static async findProfessionalsByProduct(clientData) {
        // const clientBD = await pool.connect();
        return await ProductProfessionalRepository.getProfessionalsByProduct({
            id: clientData.product_id
        });
    }

    static async findProductsByProfessional(clientData) {
        // const clientBD = await pool.connect();
        return await ProductProfessionalRepository.getProductsByProfessional(clientData);
    }
}