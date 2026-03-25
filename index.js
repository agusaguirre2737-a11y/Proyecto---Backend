import express from "express";
import categoriasmockRouter from "./routes/categoriasmock.js";
import inicializarBase from "./models/inicializarBase.js"; 
import categoriasRouter from "./routes/categorias.js";

// crear servidor
const app = express();

// middleware para poder leer el json del post
app.use(express.json());

// controlar ruta base
app.get("/", (req, res) => {
  res.send("Backend inicial!");
});

//Rutas
app.use(categoriasmockRouter);
app.use(categoriasRouter);

// levantar servidor
const port = 3000;
app.locals.fechaInicio = new Date();

// Inicializamos la base, levantamos el sitio
inicializarBase().then(() => {
  app.listen(port, () => {
    console.log(`Sitio escuchando en el puerto ${port}`);
  });
});