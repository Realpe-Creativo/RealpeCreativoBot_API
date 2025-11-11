// controllers/MessageController.js
import { MessageService } from "../services/MessageService.js";

export class MessageController {
  static async createMessage(req, res, next) {
    try {
      const message = await MessageService.createMessage(req.body);
      res.status(201).json({ success: true, data: message });
    } catch (err) {
      next(err);
    }
  }

  // Lista de chats (último mensaje por número)
  static async getChats(req, res, next) {
    try {
      const { q, limit = 50, offset = 0 } = req.query;
      const chats = await MessageService.listChats({
        search: q || "",
        limit: Number(limit),
        offset: Number(offset),
      });
      res.json({ success: true, data: chats });
    } catch (err) {
      next(err);
    }
  }

  // Mensajes de un número específico
  static async getMessages(req, res, next) {
    try {
      const { numero } = req.params;
      const { limit = 100, before, after } = req.query;
      const messages = await MessageService.listMessages(numero, {
        limit: Number(limit),
        before: before || undefined,
        after: after || undefined,
      });
      res.json({ success: true, data: messages });
    } catch (err) {
      next(err);
    }
  }
}
