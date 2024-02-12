import { Router } from "express";
import { passportCall, authorization } from "../dirname.js";
import { getUsers, registerUser } from "../Controllers/user.views.controller.js"
const router = Router();

// Vista del formulario de registro
router.get("/register", registerUser);


// Vista del perfil del usuario 
router.get("/",
    passportCall('jwt'), 
    authorization('user'),
    getUsers
);

export default router;