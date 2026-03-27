import express from "express";
import cors from "cors";

// 1. Importamos todo (¡con sintaxis moderna y el .js al final!)
import categoriasmockRouter from "./routes/categoriasmock.js";
import inicializarBase from "./models/inicializarBase.js"; 
import categoriasRouter from "./routes/categorias.js";
import articulosRouter from "./routes/articulos.js";
import seguridadRouter from "./routes/seguridad.js";
import usuariosRouter from "./routes/usuarios.js";

// 2. Crear servidor
const app = express();

// 3. Middlewares globales (Los filtros van primero)
app.use(express.json()); // Para poder leer los JSON del POST
app.use(cors({           // Para permitir conexiones desde el Frontend 
  origin: "*", 
}));

// 4. Rutas (Después de los filtros)
app.get("/", (req, res) => {
  res.send("Backend inicial!");
});
app.use(categoriasmockRouter);
app.use(categoriasRouter);
app.use(articulosRouter);
app.use(seguridadRouter); // <--- Rutas nuevas acá
app.use(usuariosRouter);  // <--- Rutas nuevas acá

// 5. Levantar servidor
const port = 3000;
app.locals.fechaInicio = new Date();

// Inicializamos la base, levantamos el sitio
inicializarBase().then(() => {
  app.listen(port, () => {
    console.log(`Sitio escuchando en el puerto ${port}`);
  });
});