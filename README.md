# API Node.js con Express

Una API REST completa construida con Node.js y Express, diseñada con arquitectura modular y mejores prácticas.

## 🚀 Características

- ✅ API REST completa con CRUD
- ✅ Arquitectura modular y escalable
- ✅ Validación de datos con express-validator
- ✅ Middleware de seguridad (Helmet, CORS, Rate Limiting)
- ✅ Manejo centralizado de errores
- ✅ Logging de requests
- ✅ Paginación y filtros
- ✅ Configuración por variables de entorno

## 📁 Estructura del Proyecto

```
src/
├── config/
│   └── config.js          # Configuración centralizada
├── controllers/
│   ├── UserController.js  # Lógica de usuarios
│   └── ProductController.js # Lógica de productos
├── middleware/
│   ├── errorHandler.js     # Manejo de errores
│   ├── notFound.js        # Middleware 404
│   └── validate.js        # Validación de datos
├── routes/
│   ├── index.js           # Rutas principales
│   ├── users.js           # Rutas de usuarios
│   └── productsRoutes.js        # Rutas de productos
└── server.js              # Servidor principal
```

## 🛠️ Instalación y Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

## 📋 Endpoints Disponibles

### Información General
- `GET /health` - Estado de la API
- `GET /api` - Información general
- `GET /api/docs` - Documentación básica

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

## 📊 Ejemplos de Uso

### Crear Usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana García",
    "email": "ana@example.com",
    "age": 28
  }'
```

### Obtener Usuarios con Paginación
```bash
curl "http://localhost:3000/api/users?page=1&limit=5&search=juan"
```

### Crear Producto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tablet",
    "price": 299.99,
    "category": "Electrónicos",
    "stock": 15
  }'
```

### Filtrar Productos
```bash
curl "http://localhost:3000/api/products?category=Electrónicos&minPrice=100&maxPrice=1000"
```

## ⚙️ Configuración

Edita el archivo `.env` para configurar:

- `PORT` - Puerto del servidor
- `NODE_ENV` - Entorno de ejecución
- Variables de base de datos
- Claves de APIs externas

## 🔒 Seguridad

- Helmet para headers de seguridad
- CORS configurado
- Rate limiting (100 requests por 15 minutos)
- Validación de entrada de datos
- Manejo seguro de errores

## 📝 Notas

Esta API usa almacenamiento en memoria para demostración. Para producción, integra una base de datos real como PostgreSQL, MongoDB, etc.

## 🚀 Próximos Pasos

- Integrar base de datos (PostgreSQL/MongoDB)
- Añadir autenticación JWT
- Implementar tests unitarios
- Documentación con Swagger/OpenAPI
- Logging avanzado
- Cache con Redis