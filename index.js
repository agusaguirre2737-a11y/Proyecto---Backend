import express from "express";

// crear servidor
const app = express();

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