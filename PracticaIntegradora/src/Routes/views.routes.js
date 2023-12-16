import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";
import CartDao from "../daos/dbManager/cart.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductDao.getAllProducts();
  const carts = await CartDao.findCart();

  res.render("index", {
    products,
    carts,
  });
});

export default router;
