import { ProductRepository } from "../repositories/ProductRepository.js";
import { pool } from "../db/connection.js";

export class ProductService {
    static async findAllProducts(clientData) {
        const clientBD = await pool.connect();
        return await ProductRepository.getProducts(clientData, clientBD);
    }

    static async findProductById(clientData) {
        const clientBD = await pool.connect();
        return await ProductRepository.findProductById(clientData, clientBD);
    }
}