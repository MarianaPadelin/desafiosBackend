import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";
// import { productModel } from "../Models/product.model.js";
// import { cartModel } from "../Models/cart.js";
// import cartDao from "../daos/dbManager/cart.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await ProductDao.getAllProducts();
    res.json({
      data: products,
      message: "Post list",
    });
  } catch (error) {
    ProductDao.errorMessage(error);
  }
});

router.get("/:id", async (req, res) => {
  const product = await ProductDao.getProductById(req.params.id);
  res.json({
    product,
  });
});

router.post("/", async (req, res) => {
  try {
    const { datosProducto } = req.body;

    //   const user = await userDao.findById(author);

    //   if (!user) return res.status(404).json({ message: "User not found" });

    const product = await ProductDao.addProduct(datosProducto);

    res.json({
      product,
      message: "New product added to commerce list",
    });
    res.redirect("/");
  } catch (error) {
    ProductDao.errorMessage(error);
  }



  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const product = await ProductDao.modifyProduct(id, req.body);

      res.json({
        product,
        message: "Product updated",
      });
    } catch (error) {
      ProductDao.errorMessage(error);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductDao.deleteProduct(id);

      res.json({
        product,
        message: "Product deleted",
      });
    } catch (error) {
      
      ProductDao.errorMessage(error);
    }
  });
});

export default router;
