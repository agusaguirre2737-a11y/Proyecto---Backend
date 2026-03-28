import jwt from "jsonwebtoken";

// Exportamos los secretos por si otra parte del sistema (como el login) necesita usarlos para crear tokens nuevos
export const accessTokenSecret = "youraccesstokensecret";
export const refreshTokenSecret = "yourrefreshtokensecrethere";

// Este es el middleware 
export const authenticateJWT = (req, res, next) => {
  // 1. Busca si el usuario trajo su "DNI" en la cabecera de la petición
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // 2. El formato suele ser "Bearer eyJhbGciOiJIUzI...", así que cortamos el string y nos quedamos solo con el token
    const token = authHeader.split(" ")[1];

    // 3. Verificamos si el token es real, si no está vencido y si fue firmado con nuestro secreto
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        // Si el token es falso o expiró, lo rebotamos (403 Forbidden)
        return res.status(403).json({ message: "El token no es válido" });
      }
      
      // Si está todo perfecto, guardamos los datos del usuario y le abrimos la puerta
      res.locals.user = user;
      next(); // Esto le dice a Express "dejalo pasar a la ruta"
    });
  } else {
    // Si directamente no trajo nada en la cabecera, ni lo intentamos (401 Unauthorized)
    res.status(401).json({ message: "Acceso denegado. Faltan credenciales." });
  }
};

// Middleware para autorizar por roles (Recibe un array, ej: ["jefe", "admin"])
export const authorizedRoles = (rolesPermitidos) => {
  return (req, res, next) => {
    // Agarramos los datos del usuario que el primer patovica (authenticateJWT) nos dejó en res.locals
    const user = res.locals.user;

    // Verificamos si el usuario existe y si su rol está incluido en el array de permitidos
    if (user && rolesPermitidos.includes(user.rol)) {
      next(); // Tiene permiso, lo dejamos pasar a la ruta
    } else {
      // No tiene permiso, lo rebotamos
      res.status(403).json({ message: "¡Acceso denegado! Tu rol no tiene permiso para realizar esta acción." });
    }
  };
};