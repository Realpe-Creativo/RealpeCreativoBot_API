const express = require('express');
const router = express.Router();

// Importar rutas específicas
const usersRoutes = require('./users');
const productsRoutes = require('./products');

// Ruta principal de la API
router.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API Node.js',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      health: '/health'
    }
  });
});

// Rutas específicas
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

// Documentación básica
router.get('/docs', (req, res) => {
  res.json({
    title: 'Documentación de la API',
    version: '1.0.0',
    endpoints: [
      {
        path: '/api/users',
        methods: ['GET', 'POST'],
        description: 'Gestión de usuarios'
      },
      {
        path: '/api/users/:id',
        methods: ['GET', 'PUT', 'DELETE'],
        description: 'Operaciones específicas de usuario'
      },
      {
        path: '/api/products',
        methods: ['GET', 'POST'],
        description: 'Gestión de productos'
      },
      {
        path: '/api/products/:id',
        methods: ['GET', 'PUT', 'DELETE'],
        description: 'Operaciones específicas de producto'
      }
    ]
  });
});

module.exports = router;