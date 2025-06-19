module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Configuración de base de datos
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'api_db',
    user: process.env.DB_USER || 'usuario',
    password: process.env.DB_PASSWORD || 'password'
  },

  // JWT configuración
  jwt: {
    secret: process.env.JWT_SECRET || 'clave_secreta_desarrollo',
    expiresIn: '24h'
  },

  // APIs externas
  externalApis: {
    key: process.env.EXTERNAL_API_KEY || ''
  }
};