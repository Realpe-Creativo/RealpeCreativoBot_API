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
            SELECT 1 FROM usuarios WHERE numero_documento = $1
        ) AS exists
    `,
    USER_CREATE: `
        INSERT INTO usuarios (nombres, apellidos, tipo_documento, numero_documento, 
                           email, celular, tipo_usuario, activo)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, nombres, apellidos, tipo_documento, numero_documento, 
                email, celular, tipo_usuario, creation_date, update_date, activo
    `,
    USER_UPDATE: `
        UPDATE usuarios 
           SET nombres = $3,
               apellidos = $4,
               tipo_documento = $5,
               email = $6,
               celular = $7
         WHERE id = $1
           AND numero_documento = $2
        RETURNING *
    `,
    CLIENT_CREATE: `
        INSERT INTO clientes (usuario_id, nombre_acudiente, fecha_nacimiento, barrio, 
                           direccion, remitido_institucion, institucion_educativa)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `,
    CLIENT_UPDATE: `
        UPDATE clientes 
           SET nombre_acudiente = $2,
               fecha_nacimiento = $3,
               barrio = $4, 
               direccion = $5,
               remitido_institucion = $6,
               institucion_educativa = $7
         WHERE usuario_id = $1
        RETURNING *
    `,
    CLIENT_FIND_BY_DOCUMENT: `
        SELECT us.id, us.nombres as names, us.apellidos as last_names, us.tipo_documento as document_type,
             us.numero_documento as document_number, us.email, us.celular as cellphone_number, 
             cl.nombre_acudiente as guardian_name, cl.fecha_nacimiento as date_of_birth,
             cl.barrio as neighborhood, cl.direccion as address, cl.remitido_institucion as sent_by_institution, 
             cl.institucion_educativa as institution
            FROM usuarios us, clientes cl
            WHERE us.numero_documento = $1
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
    PRODUCT_ALL: `
        SELECT pd.id        as product_id,
               pd.nombre    as product_name,
               pd.descripcion,
               pd.duracion,
               pd.agendable_bot,
               us.id        as user_id,
               us.nombres   as professional_names,
               us.apellidos as professional_lastnames,
               pf.cargo,
               pf.numero_whatsapp
        FROM productos pd,
             productos_profesionales pp,
             profesionales pf,
             usuarios us
        WHERE pp.producto_id = pd.id
          AND pf.id = pp.profesional_id
          AND us.id = pf.usuario_id
          AND us.tipo_usuario = 'PROFESSIONAL'
    `,
    PRODUCT_BY_ID: `
        SELECT pd.id        as product_id,
               pd.nombre    as product_name,
               pd.descripcion,
               pd.duracion,
               pd.agendable_bot,
               us.id        as user_id,
               us.nombres   as professional_names,
               us.apellidos as professional_lastnames,
               pf.cargo,
               pf.numero_whatsapp
        FROM productos pd,
             productos_profesionales pp,
             profesionales pf,
             usuarios us
        WHERE pd.id = $1
          AND pp.producto_id = pd.id
          AND pf.id = pp.profesional_id
          AND us.id = pf.usuario_id
          AND us.tipo_usuario = 'PROFESSIONAL'
    `,
});

export default Queries;