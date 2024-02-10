import { Router } from "express";
import { passportCall, authorization } from "../dirname.js";
import { getUsers } from "../Controllers/user.views.controller.js"
const router = Router();


router.get("/register", async (req, res) => {
  res.render("register", {
    fileCss: "register.css",
  });
});


// Endpoint que renderiza la vista del perfil de usuario
router.get("/",
    passportCall('jwt'), //-> Usando passport-JWT por Cookie mediante customCall
    authorization('user'),
    getUsers
);

export default router;