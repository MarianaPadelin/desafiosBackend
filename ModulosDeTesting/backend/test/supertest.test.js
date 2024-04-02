// import chai from "chai";
import { config } from "dotenv";
import supertest from "supertest";
import { expect } from "chai"
// const expect = chai.expect;
// npx mocha test/supertest.test.js  
const requester = supertest("http://localhost:9090")
// const requester = supertest(config.rootUrl);

console.log(config.rootUrl);

//en el supertest llamamos a la ruta de la api, no al dao

describe("Testing products api", () => {
  it(
    "Crear producto, el API POST /api/products debe generar un nuevo producto en la DB", async () => {
        //given
        let testProduct = {
          title: "Producto de prueba 01",
          description: "Esto es un producto de prueba",
          price: 500,
          code: "abc123",
          category: "test",
          stock: 10,
        };
        //then

        const result = await requester.post("/api/products").send(testProduct)
        console.log(result)
        //assert
    }
  );
});
