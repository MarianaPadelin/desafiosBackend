import { Router } from "express";
import { productModel } from "../Models/product.model.js";
import passport from "passport";
import { authToken } from "../dirname.js";
import { passportCall, authorization } from "../dirname.js";

const router = Router();


router.get("/register", async (req, res) => {
  res.render("register", {
    fileCss: "register.css",
  });
});

//puedo hacer una ruta desprotegida para que la vea todo el mundo, esta la ven solo los admin
// Endpoint que renderiza la vista del perfil de usuario
router.get("/",
    passportCall('jwt'), //-> Usando passport-JWT por Cookie mediante customCall
    authorization('user'),
    (req, res) => {
        res.render("profile", {
            role: req.user.role, 
            user: req.user
        });
    }
);
export default router;