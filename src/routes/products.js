const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const productsController = require('../controllers/productsController');
const validate = require('../middleware/validate');

// Validaciones
const createProductValidation = [
  body('name').notEmpty().withMessage('El nombre del producto es requerido'),
  body('price').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('category').notEmpty().withMessage('La categoría es requerida')
];

const updateProductValidation = [
  body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('price').optional().isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('category').optional().notEmpty().withMessage('La categoría no puede estar vacía')
];

// Rutas
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', createProductValidation, validate, productsController.createProduct);
router.put('/:id', updateProductValidation, validate, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;