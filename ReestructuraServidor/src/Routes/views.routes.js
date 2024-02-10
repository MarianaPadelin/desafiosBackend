import { Router } from "express";
import { getChat } from "../Controllers/general.views.controller.js";

const router = Router();


//esta ruta puede ser la que se pisa
router.get("/", async (req, res) => {
  res.render("home", {});
});

router.get("/chat", getChat);


export default router;
