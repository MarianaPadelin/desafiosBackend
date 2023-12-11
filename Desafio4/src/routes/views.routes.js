import { Router } from "express";
import { ProductManager, Product } from "../productManager.js";
const router = Router();

const prueboProducto = new ProductManager("./src/productos.json");

router.get("/", async (req, res) => {
  const datosImportados = await prueboProducto.getProducts();

  // console.log(datosImportados);
  res.render("home.hbs", {
    datos: datosImportados,
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
