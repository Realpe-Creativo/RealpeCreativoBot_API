const Queries = Object.freeze({
    AUTH_LOGIN_FIND_BY_LOGIN: `
        SELECT id, login, password, rol, status 
            FROM auth_credentials 
            WHERE login = $1`,
    AUTH_LOGIN_CREATE: `
        INSERT INTO auth_credentials (login, password, rol) 
            VALUES ($1, $2, $3) 
        RETURNING id, login, rol`,
    USER_EXISTS: `
        SELECT EXISTS (
            SELECT 1 FROM usuarios WHERE tipo_documento = $1 AND numero_documento = $2
        ) AS exists
    `,
    USER_CREATE: `
        INSERT INTO usuarios (nombres, apellidos, tipo_documento, numero_documento, 
                           email, celular, tipo_usuario, activo)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, nombres, apellidos, tipo_documento, numero_documento, 
                email, celular, tipo_usuario, fecha_creacion, fecha_actualizacion, activo
    `,
    CLIENT_CREATE: `
        INSERT INTO clientes (usuario_id, nombre_acudiente, fecha_nacimiento, barrio, 
                           direccion, remitido_institucion, institucion_educativa)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `,
    CLIENT_FIND_BY_DOCUMENT: `
        SELECT us.id, us.nombres, us.apellidos, us.tipo_documento,
             us.numero_documento, us.email, us.celular, cl.nombre_acudiente,
             cl.fecha_nacimiento, cl.barrio, cl.direccion, cl.remitido_institucion,
             cl.institucion_educativa
            FROM usuarios us, clientes cl
            WHERE us.tipo_documento = $1 
            AND us.numero_documento = $2
            AND us.activo = true
            AND cl.usuario_id = us.id
    `,
});

export default Queries;