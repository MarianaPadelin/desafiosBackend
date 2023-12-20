import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";
import CartDao from "../daos/dbManager/cart.dao.js";
import MessagesDao from "../daos/dbManager/messages.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductDao.getAllProducts();
  const carts = await CartDao.findCart();

  res.render("index", {
    products,
    carts,
  });
});


router.get("/chat", async (req,res) => {
  //req.params con el mensaje y mandarlo por parametro adentro de addmessage?
  
  const messages = await MessagesDao.addMessage(messages)

  res.render("chat", {
    messages
  })
})

export default router;
