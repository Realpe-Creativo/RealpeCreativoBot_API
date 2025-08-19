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
        INSERT INTO clientes (usuario_id)
            VALUES ($1)
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
             us.numero_documento as document_number, us.email, us.celular as cellphone_number
            FROM usuarios us, clientes cl
            WHERE us.numero_documento = $1
            AND us.activo = true
            AND cl.usuario_id = us.id
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
    APPOINTMENTS_BY_ID: `
        SELECT * FROM vw_citas_detalle vw
         WHERE vw.appointment_id = $1
    `,
    APPOINTMENTS_BY_DATE: `
        SELECT ci.id as cita_id,
               uc.id as cliente_id,
               ci.fecha_inicial as fecha_hora_inicio,
               ci.fecha_final as fecha_hora_fin,
               uc.nombres as cliente_nombres,
               uc.apellidos as cliente_apellidos,
               uc.numero_documento as cliente_numero_documento,
               ec.id as estado_cita_id,
               ec.nombre as estado_cita,
               ci.google_calendar_event_id
        FROM citas ci,
             estado_cita ec,
             clientes cl,
             usuarios uc
        WHERE cl.id = ci.cliente_id
          AND uc.id = cl.usuario_id
          AND ec.id = ci.estado_cita_id
          AND ci.fecha_inicial >= TO_TIMESTAMP($1, 'DD/MM/YYYY')
          AND ci.fecha_inicial < TO_TIMESTAMP($2, 'DD/MM/YYYY') + INTERVAL '1 day'
    `,
    APPOINTMENT_BY_DATE_DETAIL: `
        SELECT * FROM vw_citas_detalle vw
         WHERE vw.start_date_time >= TO_TIMESTAMP($1, 'DD/MM/YYYY')
           AND vw.start_date_time < TO_TIMESTAMP($2, 'DD/MM/YYYY') + INTERVAL '1 day'
    `,
    APPOINTMENT_CREATE: `
        SELECT * FROM fn_insert_appointment($1, $2, $3, $4, $5, $6, $7)
    `,
    APPOINTMENT_UPDATE: `
        SELECT * FROM fn_update_appointment($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    APPOINTMENT_UPDATE_STATUS: `
        UPDATE citas
           SET estado_cita_id = $2
         WHERE id = $1
        RETURNING *
    `,
    PRODUCT_PROFESSIONAL_EXISTS: `
        SELECT EXISTS (
            SELECT 1
            FROM productos_profesionales pp
                     JOIN profesionales pf ON pf.id = pp.profesional_id
            WHERE pf.usuario_id = $1
              AND pp.producto_id = $2
        ) AS exists
    `,
    PRODUCT_PROFESSIONAL_BY_PRODUCT: `
        SELECT pd.id               as product_id,
               pd.nombre           as product_name,
               pd.descripcion      as product_description,
               pd.duracion         as product_duration,
               pd.agendable_bot    as product_scheduled_by_bot,
               us.id               as professional_id,
               us.nombres          as professional_names,
               us.apellidos        as professional_last_names,
               us.tipo_documento   as professional_document_type,
               us.numero_documento as professional_document_number,
               us.celular          as professional_cell_phone,
               us.email            as professional_email,
               pf.cargo            as professional_occupation,
               pf.numero_whatsapp  as professional_whatsapp
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
    PRODUCT_PROFESSIONAL_BY_PROFESSIONAL: `
        SELECT us.id               as professional_id,
               us.nombres          as professional_names,
               us.apellidos        as professional_last_names,
               us.tipo_documento   as professional_document_type,
               us.numero_documento as professional_document_number,
               us.email            as professional_email,
               us.celular          as professional_cell_phone,
               pf.cargo            as professional_occupation,
               pf.numero_whatsapp  as professional_whatsapp,
               pd.id               as product_id,
               pd.nombre           as product_name,
               pd.descripcion      as product_description,
               pd.duracion         as product_duration,
               pd.agendable_bot    as product_scheduled_by_bot
        FROM usuarios us,
             profesionales pf,
             productos_profesionales pp,
             productos pd
        WHERE us.id = $1
          AND us.tipo_usuario = 'PROFESSIONAL'
          and pf.usuario_id = us.id
          AND pp.profesional_id = pf.id
          AND pd.id = pp.producto_id
    `,
});

export default Queries;