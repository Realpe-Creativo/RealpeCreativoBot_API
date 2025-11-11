// repositories/MessageRepository.js
import { pool } from "../db/connection.js";
import Queries from "../utilities/constants/Queries.js";

export class MessageRepository {
  static async insertMessage({ numero, direccion, mensaje, sent_at }, clientBD) {
    const values = [numero, direccion, mensaje, sent_at || null];
    const executor = clientBD || pool;
    const result = await executor.query(Queries.MESSAGE_INSERT, values);
    return result.rows[0];
  }

  // Lista de chats (último mensaje por número). Acepta search opcional.
  static async getChats({ search = "", limit = 50, offset = 0 }, clientBD) {
    const executor = clientBD || pool;

    if (search && search.trim().length > 0) {
      const values = [`%${search}%`, Number(limit), Number(offset)];
      const result = await executor.query(Queries.CHATS_LIST_LAST_MESSAGE_SEARCH, values);
      return result.rows;
    } else {
      const values = [Number(limit), Number(offset)];
      const result = await executor.query(Queries.CHATS_LIST_LAST_MESSAGE, values);
      return result.rows;
    }
  }

  // Mensajes por número (ordenados ASC por fecha)
  static async getMessagesByNumero({ numero, limit = 100, before = null, after = null }, clientBD) {
    const executor = clientBD || pool;
    const values = [numero, before, after, Number(limit)];
    const result = await executor.query(Queries.MESSAGES_BY_NUMBER, values);
    return result.rows;
  }
}
