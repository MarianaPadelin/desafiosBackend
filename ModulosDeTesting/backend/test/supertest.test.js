import mongoose from "mongoose";
import { config } from "dotenv";
import supertest from "supertest";
import { expect } from "chai";

// npx mocha test/supertest.test.js
const requester = supertest("http://localhost:9090");
// const requester = supertest(config.rootUrl);

//en el supertest llamamos a la ruta de la api, no al dao
//no usar función flecha con supertest

describe("Testing ecommerce app", () => {
  //primero registro un usuario
  before(function () {
    this.cookie;
    this.testUser = {
      first_name: "test",
      last_name: "test",
      email: "test@gmail.com",
      age: 30,
      password: "123",
    };
  });

   describe("Testing de login y session usando cookies", () => {
     it("Registrar correctamente al usuario", async function () {
       //given
       //then
       const { statusCode } = await requester
         .post("/api/jwt/register")
         .send(this.testUser);
       //assert
       expect(statusCode).is.eql(201);
     });

     it("Loggear correctamente al usuario", async function () {
       //given
       const loginTest = {
         email: this.testUser.email,
         password: this.testUser.password,
       };

       //then
       const result = await requester.post("/api/jwt/login").send(loginTest);

       const cookieResult = result.headers["set-cookie"][0];

       //assert
       expect(result.statusCode).is.eql(200);

       //extraemos la cookie para guardarla en la variable global this.cookie
       const cookieData = cookieResult.split("=");
       this.cookie = {
         name: cookieData[0],
         value: cookieData[1],
       };

       expect(this.cookie.name).to.be.ok.and.eql("jwtCookieToken");
       expect(this.cookie.value).to.be.ok;
     });

    
   });


  describe("Testing products api", () => {
    it("Crear producto, el API POST /api/products debe generar un nuevo producto en la DB", async function () {
      //given
      console.log(this.cookie)
      const testProduct = {
        title: "Producto de prueba 01",
        description: "Esto es un producto de prueba",
        price: 500,
        code: "abc123",
        category: "test",
        stock: 10,
      };

      //then

      //seteamos la cookie para dar autorización a la ruta
      const { _body } = await requester
        .get("ruta")
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
        //no lee el set cookie

      const { statusCode, ok } = await requester
        .post("/api/products")
        .send(testProduct);


      //assert
      expect(statusCode).is.eqls(201);
      //me da status 401 porque el usuario no está autorizado (no registra el inicio de sesión del test anterior)
    });

    it("Crear producto sin un campo, debe retornar un status 400 con error.", async function () {
      //given
      const testProduct = {
        //   title: "Producto de prueba 01",
        description: "Esto es un producto de prueba",
        price: 500,
        code: "abc123",
        category: "test",
        stock: 10,
      };

      //then

      const { statusCode, ok, _body } = await requester
        .post("/api/products")
        .send(testProduct);
      // console.log(statusCode, ok)
      // console.log(_body)

      //assert
      expect(statusCode).is.eqls(400);
      //expect(error).is.eqls(INVALID_TYPES:ERROR)
      expect(_body).is.ok.and.to.have.property("error");
    });

    // afterEach(function () {
    //   //borro el usuario que agregué, para que no se repita el usuario agregado al hacer nuevos tests
    //   mongoose.connection.collections.products.drop();
    // });
  });
 
});
