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
                email, celular, tipo_usuario, creation_date, update_date, activo
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
    PROFESSIONAL_BY_ID: `
        SELECT us.id, us.nombres, us.apellidos, us.tipo_documento,
             us.email, us.celular, pr.cargo, pr.numero_whatsapp,
             pr.activo
            FROM usuarios us, profesionales pr
            WHERE pr.id = $1
            AND pr.usuario_id = us.id
            AND pr.activo = true;
    `,
    PROFESSIONAL_BY_FILTERS: `
        SELECT us.id, us.nombres, us.apellidos, us.tipo_documento,
             us.email, us.celular, pr.cargo, pr.numero_whatsapp,
             pr.activo
            FROM usuarios us, profesionales pr
            WHERE pr.id = $1
            AND pr.numero_whatsapp = $2
            AND pr.cargo = $3
            AND pr.activo = true
            AND us.id = pr.usuario_id
            ;
    `,
    CHAT_STATUS_BY_NUMBER: `
        SELECT ec.id, ec.numero_whatsapp, ec.estado_conversacion
        FROM estado_chat ec
        WHERE ec.numero_whatsapp = $1;
    `,
    CHAT_STATUS_EXISTS: `
        SELECT EXISTS (
            SELECT 1 FROM estado_chat ec WHERE ec.numero_whatsapp = $1
        ) AS exists
    `,
    CHAT_STATUS_CREATE: `
        INSERT INTO estado_chat (numero_whatsapp, estado_conversacion)
            VALUES ($1, $2)
        RETURNING *
    `,
    CHAT_STATUS_UDPATE: `
        UPDATE estado_chat
           SET estado_conversacion = $2
         WHERE id = $1
        RETURNING *
    `,
});

export default Queries;