const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error
  console.error('Error:', err);

  // Error de sintaxis JSON
  if (err.type === 'entity.parse.failed') {
    const message = 'JSON inválido';
    error = { message, statusCode: 400 };
  }

  // Error de validación de Mongoose (si usas MongoDB)
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  // Error de clave duplicada (MongoDB)
  if (err.code === 11000) {
    const message = 'Recurso duplicado';
    error = { message, statusCode: 400 };
  }

  // Error de cast de ObjectId (MongoDB)
  if (err.name === 'CastError') {
    const message = 'ID de recurso inválido';
    error = { message, statusCode: 404 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export { errorHandler };