import express from "express";
import usuarios from "../models/usuariosModel.js"; 
import { authenticateJWT } from "../middlewares/auth.js"; 

const router = express.Router();

// Obtener todas los usuarios, con seguridad JWT
router.get(
  "/api/usuarios",
  authenticateJWT,
  async function (req, res, next) {
    try {
      // Si el código llega hasta esta línea, es porque el token es válido y está autenticado
      // Ahora controlamos la autorización específica, según el rol
      const user = res.locals.user;
      
      if (user.rol !== "jefe") {
        return res.status(403).json({ message: "¡Usuario no autorizado! Se requiere rol de jefe." });
      }
      
      const items = await usuarios.findAll();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }
);

export default router;