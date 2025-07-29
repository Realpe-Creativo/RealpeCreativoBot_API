import { ProductsRepository } from "../repositories/productsRepository.js";
import { pool } from "../db/connection.js";

export class ProductsService {
    static async findAllProducts(clientData) {
        const clientBD = await pool.connect();
        return await ProductsRepository.getProducts(clientData, clientBD);
    }

    static async findProductById(clientData) {
        const clientBD = await pool.connect();
        return await ProductsRepository.findProductById(clientData, clientBD);
    }
}