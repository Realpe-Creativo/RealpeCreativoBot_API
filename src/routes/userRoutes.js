import { Router } from "express";
import { UserController } from "../controllers/userController.js";

const router = Router();

// Crear usuario
router.post("/", UserController.createUser);

// Obtener usuario por número de documento
router.get("/:email", UserController.getUserByEmail);

// Actualizar usuario
router.put("/", UserController.updateUser);

export default router;
