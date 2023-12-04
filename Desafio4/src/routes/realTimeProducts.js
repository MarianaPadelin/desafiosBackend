import { Router } from "express";
import { ProductManager, Product } from "../productManager.js";

const realTimeProducts = Router();

const prueboProducto = new ProductManager("./src/productos.json");

realTimeProducts.get("/", async (req, res) => {
  const datosImportados = await prueboProducto.getProducts();

  res.render("realTimeProducts", {
    titulo: datosImportados.map(({ title }) => title),
    descripcion: datosImportados.map(({ description }) => description),
    precio: datosImportados.map(({ price }) => price),
    fileCss: "realTime.css",
  });

});


const users = [];

realTimeProducts.post("/realTimeProducts", (req, res) => {
  const { title } = req.body;

  users.push({
    title
  });


    res.render("realTimeProducts", {
     title
    });
});

export default realTimeProducts;
