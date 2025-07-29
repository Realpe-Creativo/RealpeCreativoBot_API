import Joi from "joi";

const ProductSchema = Object.freeze({
    GET_PRODUCT_SCHEMA: Joi.object({
        id: Joi.string().pattern(/^\d{1,8}$/).required()
    })
});
export default ProductSchema;