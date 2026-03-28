import express from "express";
import cors from "cors";

import categoriasmockRouter from "./routes/categoriasmock.js";
import inicializarBase from "./models/inicializarBase.js"; 
import categoriasRouter from "./routes/categorias.js";
import articulosRouter from "./routes/articulos.js";
import seguridadRouter from "./routes/seguridad.js";
import usuariosRouter from "./routes/usuarios.js";

// Crear servidor
const app = express();

//  Middlewares globales 
app.use(express.json()); 
app.use(cors({ origin: "*" }));

// Rutas
app.get("/", (req, res) => {
  res.send("Backend inicial!");
});

// RUTA NUEVA PARA EL TEST 
app.get("/_isalive", (req, res) => {
  res.send(`Ejecutandose desde: ${app.locals.fechaInicio}`);
});

app.use(categoriasmockRouter);
app.use(categoriasRouter);
app.use(articulosRouter);
app.use(seguridadRouter); 
app.use(usuariosRouter);  

// RUTA NUEVA PARA EL TEST 404 
app.use((req, res) => {
  res.status(404).send("No encontrada!");
});

// Levantar servidor
const port = 3000;
app.locals.fechaInicio = new Date();

// Truco moderno: Si Jest está corriendo los tests, inyecta una variable secreta llamada JEST_WORKER_ID
// Usamos eso para saber si estamos en modo test o no.
const estamosTesteando = process.env.JEST_WORKER_ID !== undefined;

// Solo inicializamos la base y levantamos el puerto si NO estamos testeando
if (!estamosTesteando) {
  inicializarBase().then(() => {
    app.listen(port, () => {
      console.log(`Sitio escuchando en el puerto ${port}`);
    });
  });
}

// Exportamos app con sintaxis moderna para que Supertest la pueda agarrar
export default app;