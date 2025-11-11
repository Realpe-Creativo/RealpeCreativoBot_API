// services/MessageService.js
import { MessageRepository } from "../repositories/MessageRepository.js";

export class MessageService {
  static async createMessage(payload) {
    // Validaciones mínimas
    const { numero, direccion, mensaje, sent_at } = payload || {};
    if (!numero) throw new Error("numero es requerido");
    if (!mensaje) throw new Error("mensaje es requerido");
    if (!["IN", "OUT"].includes(direccion)) {
      throw new Error("direccion inválida (use 'IN' o 'OUT')");
    }
    return MessageRepository.insertMessage({ numero, direccion, mensaje, sent_at });
  }

  static async listChats({ search, limit, offset }) {
    return MessageRepository.getChats({ search, limit, offset });
  }

  static async listMessages(numero, { limit, before, after }) {
    if (!numero) throw new Error("numero es requerido");
    return MessageRepository.getMessagesByNumero({ numero, limit, before, after });
  }
}
