const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const usersController = require('../controllers/usersController');
const validate = require('../middleware/validate');

// Validaciones
const createUserValidation = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('age').isInt({ min: 0 }).withMessage('La edad debe ser un número positivo')
];

const updateUserValidation = [
  body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('age').optional().isInt({ min: 0 }).withMessage('La edad debe ser un número positivo')
];

// Rutas
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', createUserValidation, validate, usersController.createUser);
router.put('/:id', updateUserValidation, validate, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;