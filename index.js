import express from "express";
import categoriasmockRouter from "./routes/categoriasmock.js";

// crear servidor
const app = express();

//middleware para poder leer el json del post
app.use(express.json());

// controlar ruta
app.get("/", (req, res) => {
res.send("Backend inicial dds-backend!");
});

// levantar servidor
const port = 3000;
app.locals.fechaInicio = new Date();

// fecha y hora inicio de aplicacion
app.listen(port, () => {
console.log(`sitio escuchando en el puerto ${port}`);
});

//Una vez definido el controlador de nuestro recurso debemos vincularlo a nuestra aplicación
//express, cargando el módulo de ruta en el archivo index.js antes de levantar el servidor
//(app.listen...)
app.use(categoriasmockRouter);