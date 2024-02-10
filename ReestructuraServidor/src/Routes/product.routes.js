import { Router } from "express";
import { getProducts, getOneProduct, postProduct, changeProduct, deleteProduct } from "../Controllers/products.controller.js";  

const router = Router();

router.get("/", getProducts);

router.get("/:id", getOneProduct);

router.post("/", postProduct);

router.put("/:id", changeProduct);

router.delete("/:id", deleteProduct);

export default router;
