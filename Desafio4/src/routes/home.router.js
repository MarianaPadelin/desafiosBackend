import { Router } from "express";
import { ProductManager, Product } from "../productManager.js";

const homeRouter = Router();

const prueboProducto = new ProductManager("./src/productos.json");

homeRouter.get("/", async (req, res) => {
    const datosImportados = await prueboProducto.getProducts();
  
     res.render("home", {
       titulo: datosImportados.map(({ title }) => title),
       descripcion: datosImportados.map(({ description }) => description),
       precio: datosImportados.map(({ price }) => price),
       fileCss: "index.css",
     });
//   console.log(datosImportados.map(({ title }) => title))
});


export default homeRouter;