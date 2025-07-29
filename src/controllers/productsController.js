import { ProductsService } from "../services/productsService.js";
import CodeResponse from "../utilities/constants/CodeResponse.js";
import ProductSchema from "../utilities/schemas/ProductSchema.js";

export class ProductsController {

  static async getProducts(req, res) {

    try {

      const products = await ProductsService.findAllProducts(null);

      if (products == null || products.rowCount <= 0) {
        return res.status(404).json({
          code_response: CodeResponse.CODE_FAILED,
          message: `There is any product registered.`,
          success: false,
          data: null
        })
      }

      const listProducts = [];

      products.rows.forEach((item) => {
        listProducts.push({
          producto_id: item.product_id,
          nombre: item.product_name,
          descripcion: item.descripcion,
          duracion_minutos: item.duracion,
          es_agendable_por_bot: item.agendable_bot,
          profesional: [
            {
              profesional_id: item.user_id,
              nombres: item.professional_names,
              apellidos: item.professional_lastnames,
              cargo: item.cargo,
              numero_whatsapp: item.numero_whatsapp
            }
          ]
        });
      });

      return res.status(200).json({
        code_response: CodeResponse.CODE_SUCCESS,
        message: "Products found.",
        success: true,
        data: listProducts
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

      const product = await ProductsService.findProductById({
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

      const productDetail = {
        producto_id: product.product_id,
        nombre: product.product_name,
        descripcion: product.descripcion,
        duracion_minutos: product.duracion,
        es_agendable_por_bot: product.agendable_bot,
        profesional: [
          {
            profesional_id: product.user_id,
            nombres: product.professional_names,
            apellidos: product.professional_lastnames,
            cargo: product.cargo,
            numero_whatsapp: product.numero_whatsapp
          }
        ]
      };

      return res.status(200).json({
        code_response: CodeResponse.CODE_SUCCESS,
        message: "Product found.",
        success: true,
        data: productDetail
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