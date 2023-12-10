import { Router } from "express";
import { ProductManager, Product } from "../productManager.js";
const router = Router();

const prueboProducto = new ProductManager("./src/productos.json");

router.get("/", async (req, res) => {
    const datosImportados = await prueboProducto.getProducts();

  res.render("home.hbs", {
    datos: datosImportados.map((post) => {
      return `    
            ID: ${post.id}
            TITLE: ${post.title}
            DESCRIPTION: ${post.description}
            PRICE: ${post.price}
            CODE: ${post.code}
            STATUS: ${post.status}
            CATEGORY: ${post.category}
            STOCK: ${post.stock}
            THUMBNAILS: ${post.thumbnail}
          `;
    }),
    pageName: "Home",
    fileCss: "index.css",
  });
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts.hbs", {
    pageName: "Real Time Products",
    fileCss: "realTime.css",
  });
});

export default router;
