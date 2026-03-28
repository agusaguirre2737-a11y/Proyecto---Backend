import request from "supertest";
import app from "../index.js"; 

describe("GET /api/categorias", function () {
  it("Debería devolver todas las categorias", async function () {
    const res = await request(app)
      .get("/api/categorias")
      .set("content-type", "application/json");
      
    expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    expect(res.statusCode).toEqual(200);
    
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdCategoria: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /api/categorias/:id", function () {
  it("Debería responder con un JSON conteniendo una sola categoría", async function () {
    const res = await request(app).get("/api/categorias/1");
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCategoria: 1,
        Nombre: expect.any(String), // No nos importa qué categoría sea, solo que sea un texto
      })
    );
  });
});