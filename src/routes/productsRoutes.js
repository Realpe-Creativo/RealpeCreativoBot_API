import express from "express";
import { ProductsController } from "../controllers/productsController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/products/ Get all products
router.get("/", ProductsController.getProducts);

// GET /api/products/get-by-id Get product by ID
router.post("/get-by-id", ProductsController.getProductById);

export default router;