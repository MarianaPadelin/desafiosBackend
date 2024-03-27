import { Router } from "express";
// import {
//   passportCall,
//   authorization,
// } from "../../utils/authorizations.js";
import { passportCall, authorization, authToken } from "../../dirname.js";
import {
  getUsers,
  registerUser,
  getPremiumUsers
} from "../../Controllers/VIEWS/user.views.controller.js";
import { getUserProducts } from "../../Controllers/API/products.controller.js";
const router = Router();

// Vista del formulario de registro
router.get("/register", registerUser);

// Vista del perfil del usuario
router.get("/", 
passportCall("jwt"), 
authorization(["user", "premium"]), 
getUsers);


//Vista del listado de productos con la bienvenida al usuario y la opción de ver su carrito
router.get(
  "/products",
  passportCall("jwt"),
  authorization(["user", "premium"]),
  getUserProducts
);




export default router;
