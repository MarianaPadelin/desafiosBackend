import { Router } from "express";
import passport from "passport";
import { githubcallback, logUser, logout } from "../Controllers/jwt.controller.js";

const router = Router();

//en jwt también se usan las rutas de failureRedirect?
//validar admin mail desde register en vez de login


router.post("/login", logUser)

// Register PassportLocal
router.post('/register', passport.authenticate('register', { session: false }), async (req, res) => {
    console.log("Registrando usuario:");
    res.status(201).send({ status: "success", message: "Usuario creado con éxito." });
})


//Logout

router.get("/logout", logout);

//Login con github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] })
);

//para volver desde la pagina de autorización de github a mi pagina

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "github/error",
  }),
  githubcallback
);


// //rutas de falla de registro o login:
// router.get("/fail-register", (req, res) => {
//   res.status(401).send({ error: "Falla al registrarse" });
// });

// router.get("/fail-login", (req, res) => {
//   res.status(401).send({ error: "Falla al iniciar sesión" });
// });

// router.get("/success-register", (req, res) => {
//   res.status(201).send({
//     status: 201,
//     message: `Usuario registrado correctamente.`,
//   });
// });




export default router;