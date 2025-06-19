const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: error.message,
    availableEndpoints: {
      api: '/api',
      users: '/api/users',
      products: '/api/products',
      health: '/health',
      docs: '/api/docs'
    }
  });
};

module.exports = notFound;