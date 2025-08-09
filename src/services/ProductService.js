import { ProductRepository } from "../repositories/ProductRepository.js";
import { pool } from "../db/connection.js";

export class ProductService {
    static async findAllProducts(clientData) {
        return await ProductRepository.getProducts();
    }

    static async findProductById(clientData) {
        return await ProductRepository.findProductById(clientData);
    }
}