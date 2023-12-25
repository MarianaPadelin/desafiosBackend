import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";
// import cartDao from "../daos/dbManager/cart.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {

    const products = await ProductDao.getAllProducts();
    res.json({
      message: "Post list",
      data: products,
    });
  } catch (error) {
    ProductDao.errorMessage(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductDao.getProductById(id);
    if (!product) {
      console.log("id not found");
      res.json({
        message: "id not found",
      });
    } else {
      res.status(200).json({
        message: "Product found",
        product,
      });
    }
  } catch (error) {
    ProductDao.errorMessage(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const datosProducto = req.body;

    console.log(datosProducto);

    const product = await ProductDao.addProduct(datosProducto);
    if (product === false) {
      console.log("Couldn't add product to list");
      res.status(404).json({
        message: "Couldn't add product to list. Fields incomplete.",
      });
    } else {
      res.status(200).json({
        message: "New product added to commerce list",
        data: product,
      });
    }
  } catch (error) {
    ProductDao.errorMessage(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductDao.modifyProduct(id, req.body);
    
//para devolver el producto actualizado volver a hacer un findBYId de este mismo producto acá

    if (!product) {
      console.log("id not found");
      res.json({
        message: "id not found",
      });
    } else {
      res.status(200).json({
        message: "Product updated",
        product,
      });
    }
  } catch (error) {
    console.log("hay un error de put");
    ProductDao.errorMessage(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDao.deleteProduct(id);

    if (!product) {
      console.log("id not found");
      res.json({
        message: "id not found",
      });
    } else {
      res.status(200).json({
        message: "Product deleted",
        product,
      });
    }
  } catch (error) {
    ProductDao.errorMessage(error);
  }
});

export default router;
