import { Router } from "express";
import CartDao from "../daos/dbManager/cart.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await CartDao.findCart();

    res.json({
      data: carts,
      message: "These are all the carts",
    });
  } catch (error) {
    CartDao.errorMessage(error)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartDao.findCartById(id);

    if (!cart) return res.json({ message: "Cart not found" });

    res.json({
      cart,
      message: "Cart found",
    });
  } catch (error) {
       CartDao.errorMessage(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await CartDao.createCart(req.body);

    res.json({
      cart,
      message: "New cart created",
    });
  } catch (error) {
      CartDao.errorMessage(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await CartDao.findCartById(id);

    await CartDao.updateCart(id, req.body);

    res.json({
      cart,
      message: "Cart updated",
    });
  } catch (error) {
      CartDao.errorMessage(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartDao.deleteCart(id);

    res.json({
      cart,
      message: "Cart deleted",
    });
  } catch (error) {
      CartDao.errorMessage(error);
  }
});

export default router;
