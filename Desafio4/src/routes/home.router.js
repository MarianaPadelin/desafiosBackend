import { Router } from "express";
import { ProductManager, Product } from "../productManager.js";

const homeRouter = Router();

const prueboProducto = new ProductManager("./src/productos.json");

homeRouter.get("/", async (req, res) => {
  const datosImportados = await prueboProducto.getProducts();

  const datosMapeados = datosImportados.map((prod) => prod.title);
  console.log(datosMapeados);
  // const listaDeProductos = document.querySelector("#products");
  res.render("home", {
    datos: datosMapeados,
    // datos: datosImportados.map((post) => {
    //   return `    
    //         ID: ${post.id}\n
    //         TITLE: ${post.title}
    //         DESCRIPTION: ${post.description}
    //         PRICE: ${post.price}
    //         CODE: ${post.code}
    //         STATUS: ${post.status}
    //         CATEGORY: ${post.category}
    //         STOCK: ${post.stock}
    //         THUMBNAILS: ${post.thumbnail}
    //         \n
    //       `;
    // }),
    //  descripcion: datosImportados.map(({ description }) => description),
    //  precio: datosImportados.map(({ price }) => price),
  });
});

export default homeRouter;
