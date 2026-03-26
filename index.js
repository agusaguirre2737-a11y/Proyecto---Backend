import express from "express";
import categoriasmockRouter from "./routes/categoriasmock.js";
import inicializarBase from "./models/inicializarBase.js"; 
import categoriasRouter from "./routes/categorias.js";
import articulosRouter from "./routes/articulos.js";
import cors from "cors";

// crear servidor
const app = express();

// Middlewares globales
app.use(express.json()); // Para poder leer los JSON del POST
app.use(cors({           // Para permitir conexiones desde el Frontend 
  origin: "*", 
}));

// Rutas
app.get("/", (req, res) => {
  res.send("Backend inicial!");
});
app.use(categoriasmockRouter);
app.use(categoriasRouter);
app.use(articulosRouter);

// Levantar servidor
const port = 3000;
app.locals.fechaInicio = new Date();

// Inicializamos la base, levantamos el sitio
inicializarBase().then(() => {
  app.listen(port, () => {
    console.log(`Sitio escuchando en el puerto ${port}`);
  });
});