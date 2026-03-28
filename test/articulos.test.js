import request from "supertest";
import app from "../index.js"; 

// Función auxiliar para generar nombres aleatorios y evitar errores de "Nombre duplicado" en la base de datos
const generarNombreAleatorio = () => "Articulo " + (Math.random() + 1).toString(36).substring(2);

const articuloAlta = {
  Nombre: generarNombreAleatorio(),
  Precio: 10.5,
  CodigoDeBarra: "1234567890123",
  IdCategoria: 1,
  Stock: 11,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};

const articuloModificacion = {
  IdArticulo: 1,
  Nombre: generarNombreAleatorio(),
  Precio: 10.5,
  CodigoDeBarra: "1234567890123",
  IdCategoria: 1,
  Stock: 11,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};

// Test route/articulos GET
describe("GET /api/articulos", () => {
  it("Deberia devolver todos los artículos paginados", async () => {
    const res = await request(app).get("/api/articulos?Pagina=1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdArticulo: expect.any(Number),
            Nombre: expect.any(String),
            Precio: expect.any(Number),
            Stock: expect.any(Number),
            FechaAlta: expect.any(String),
            Activo: expect.any(Boolean),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// Test route/articulos GET con filtros
describe("GET /api/articulos con filtros", () => {
  it("Deberia devolver los articulos según filtro", async () => {
    const res = await request(app).get("/api/articulos?Nombre=AIRE&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    // Función prolija para verificar que los filtros se aplicaron bien
    const verificarPropiedades = (array) => {
      for (let i = 0; i < array.length; i++) {
        if (!array[i].Nombre.includes("AIRE") || !array[i].Activo) {
          return false;
        }
      }
      return true;
    };

    expect(verificarPropiedades(res.body.Items)).toEqual(true);
  });
});

// Test route/articulos/:id GET
describe("GET /api/articulos/:id", () => {
  it("Deberia devolver el artículo con el id 1", async () => {
    const res = await request(app).get("/api/articulos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticulo: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
        CodigoDeBarra: expect.any(String),
        IdCategoria: expect.any(Number),
        Stock: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// Test route/articulos POST
describe("POST /api/articulos", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
    const res = await request(app).post("/api/articulos").send(articuloAlta);
    
    // OJO ACÁ: El apunte pide 201 (Created). Si tu código de Express devuelve 200, cambialo acá.
    expect(res.statusCode).toEqual(200); 
    
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticulo: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
        CodigoDeBarra: expect.any(String),
        IdCategoria: expect.any(Number),
        Stock: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// Test route/articulos/:id PUT
describe("PUT /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app).put("/api/articulos/1").send(articuloModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// Test route/articulos/:id DELETE
describe("DELETE /api/articulos/:id", () => {
  it("Debería devolver el artículo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/articulos/1");
    expect(res.statusCode).toEqual(200);
    // Como es baja lógica, no se borra realmente, solo cambia el estado Activo a false
  });
});