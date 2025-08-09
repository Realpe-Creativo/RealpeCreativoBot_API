import { ProductService } from "../services/ProductService.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";
import ProductSchema from "../utilities/schemas/ProductSchema.js";

export class ProductController {

  static async getProducts(req, res) {

    try {

      const products = await ProductService.findAllProducts(null);

      if (products == null || products.rowCount <= 0) {
        return res.status(404).json({
          code_response: CodeResponse.CODE_FAILED,
          message: `There is any product registered.`,
          success: false,
          data: null
        })
      }

      return res.status(200).json({
        code_response: CodeResponse.CODE_SUCCESS,
        message: "Products found.",
        success: true,
        data: products
      })

    } catch (error) {
      return res.status(400).json({
        code_response: CodeResponse.CODE_FAILED,
        error: error.message,
        success: false,
        data: null
      })
    }
  }

  static async getProductById(req, res) {

    const { error } = ProductSchema.GET_PRODUCT_SCHEMA.validate(req.body);

    try {

      const product = await ProductService.findProductById({
        id: req.body.id
      });

      if (product == null) {
        return res.status(404).json({
          code_response: CodeResponse.CODE_FAILED,
          message: `Product ${req.body.id} not found.`,
          success: false,
          data: null
        })
      }

      return res.status(200).json({
        code_response: CodeResponse.CODE_SUCCESS,
        message: "Product found.",
        success: true,
        data: product
      })

    } catch (error) {
      return res.status(400).json({
        code_response: CodeResponse.CODE_FAILED,
        error: error.message,
        success: false,
        data: null
      })
    }
  }
}