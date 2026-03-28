import express from "express";
import usuarios from "../models/usuariosModel.js"; 
// Importamos los DOS patovicas
import { authenticateJWT, authorizedRoles } from "../middlewares/auth.js"; 

const router = express.Router();

// Obtener todas los usuarios, con seguridad JWT y control de Roles
router.get(
  "/api/usuarios",
  authenticateJWT,             // Patovica 1: Revisa si el token (DNI) es válido
  authorizedRoles(["jefe"]),   // Patovica 2: Revisa si el rol está en la lista de invitados VIP
  async function (req, res, next) {
    try {
      // Si el código llega acá, es porque pasó a los dos patovicas.
      // ¡Mirá qué limpio quedó el código sin ese "if" manual!
      const items = await usuarios.findAll();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }
);

export default router;