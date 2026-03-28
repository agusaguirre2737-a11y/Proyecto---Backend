import request from "supertest";
import app from "../index.js"; 

const usuarioJefe = { usuario: "admin", clave: "123" };
const usuarioEmpleado = { usuario: "juan", clave: "123" };

describe("POST /api/login admin", function () {
  it("Devolveria error de autenticacion, porque tiene clave errónea", async function () {
    const res = await request(app)
      .post("/api/login")
      .send({ usuario: "admin", clave: "errónea" });
      
    expect(res.statusCode).toEqual(401);
    // Nota: Si tu ruta de login devuelve un texto diferente para clave incorrecta, cambialo acá.
    expect(res.body.message).toEqual("Usuario o clave incorrectos"); 
  });

  it("Devolvería el token para usuario admin", async function () {
    const res = await request(app).post("/api/login").send(usuarioJefe);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toEqual(expect.any(String)); // Solo verifica que nos devuelva un token
  });
});

describe("GET /api/usuarios", () => {
  it("Devolveria error, porque falta token de autorización", async function () {
    const res = await request(app).get("/api/usuarios");
    
    expect(res.statusCode).toEqual(401);
    // Este mensaje tiene que ser el MISMO que pusimos en el middleware authenticateJWT
    expect(res.body.message).toEqual("Acceso denegado. Faltan credenciales."); 
  });

  it("Devolvería todos los usuarios, solo autorizado para administradores (jefes)", async function () {
    // 1. Simula el Login del jefe para robarle el token
    const res1 = await request(app)
      .post("/api/login")
      .set("Content-type", "application/json")
      .send(usuarioJefe);
      
    expect(res1.statusCode).toEqual(200);
    let token = res1.body.accessToken;

    // 2. Usa ese token para entrar a la zona VIP de usuarios
    const res = await request(app)
      .get("/api/usuarios")
      .set("Authorization", `Bearer ${token}`);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdUsuario: expect.any(Number),
          Nombre: expect.any(String),
          Clave: expect.any(String),
          Rol: expect.any(String),
        }),
      ])
    );
  });

  it("Devolvería error de autorizacion, porque solo están autorizados los jefes", async function () {
    const res1 = await request(app)
      .post("/api/login")
      .set("Content-type", "application/json")
      .send(usuarioEmpleado);
      
    expect(res1.statusCode).toEqual(200);
    let token = res1.body.accessToken;

    const res = await request(app)
      .get("/api/usuarios")
      .set("Authorization", `Bearer ${token}`);
      
    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual("¡Acceso denegado! Tu rol no tiene permiso para realizar esta acción.");
  });
});