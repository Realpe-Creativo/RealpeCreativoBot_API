import { UserRepository } from "../repositories/UserRepository.js";

export class UserController {

  // Crear usuario
  static async createUser(req, res) {
    try {
      const data = req.body;

      // Validar si ya existe el correo
      const exists = await UserRepository.existsByEmail({ email: data.email });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "El correo ya se encuentra registrado"
        });
      }

      const user = await UserRepository.create(data);

      return res.status(201).json({
        success: true,
        message: "Usuario creado correctamente",
        data: user
      });

    } catch (error) {
      console.error("Error creando usuario:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  }

  // Buscar usuario por documento
  static async getUserByEmail(req, res) {
    try {
      const { email } = req.params;

      const user = await UserRepository.findByEmail({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado"
        });
      }

      return res.status(200).json({
        success: true,
        data: user
      });

    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  }

  // Actualizar usuario
  static async updateUser(req, res) {
    try {
      const data = req.body;

      const updatedUser = await UserRepository.update(data);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado para actualizar"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Usuario actualizado correctamente",
        data: updatedUser
      });

    } catch (error) {
      console.error("Error actualizando usuario:", error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  }
}
