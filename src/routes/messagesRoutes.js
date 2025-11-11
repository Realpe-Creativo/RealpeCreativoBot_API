// routes/messagesRoutes.js
import { Router } from "express";
import { MessageController } from "../controllers/MessageController.js";

const router = Router();

// Lista de chats (último mensaje por número)
router.get("/chats", MessageController.getChats);

// Mensajes de un chat (por número)
router.get("/chats/:numero/messages", MessageController.getMessages);

// Crear mensaje (enviado o recibido)
router.post("/messages", MessageController.createMessage);

export default router;
