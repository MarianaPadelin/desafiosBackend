import { Router } from "express";
import { validatePass, generateJWToken } from "../dirname.js";
import { userModel } from "../Models/user.model.js";
import passport from "passport";

const router = Router();

//en jwt también se usan las rutas de failureRedirect?
//falla en la vista de usuario (no lee las cookies de cookieextractor, en passportConfig?)

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try{
  const userExists = await userModel.findOne({ email: email });

  if (!userExists) {
    console.warn(`User doesn't exist: ${email}`);
    return res.status(204).send({
      error: "User not found",
      message: "Usuario no encontrado: " + email,
    });
  }
  if (!validatePass(userExists, password)) {
    console.warn(`Invalid credentials for user: ${email}`);
    return res
      .status(401)
      .send({
        status: "error",
        error: "Credenciales incorrectas",
      });
  }


  //hacer otro con admin
  const tokenUser = {
    name: `${userExists.first_name} ${userExists.last_name}`,
    email: userExists.email,
    age: userExists.age,
    role: "user",
  }

  const access_token = generateJWToken(tokenUser);
  console.log("el token es:" + access_token);

//el primer parámetro es el nombre de la cookie, el segundo es la info que contiene, el tercero su configuración
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 120000,
    httpOnly: true, //No se expone la cookie
    // httpOnly: false //Sí se expone la cookie
  
  });

  res.send({ message: "Login successful" });

    }catch (error){
        console.log(error)
         return res
           .status(500)
           .send({
             status: "error",
             error: "Error interno de la applicacion.",
           });
    }
})

// Register PassportLocal
router.post('/register', passport.authenticate('register', { session: false }), async (req, res) => {
    console.log("Registrando usuario:");
    res.status(201).send({ status: "success", message: "Usuario creado con éxito." });
})


//Logout

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: "Error de logout", msg: "Error al cerrar la session" });
    }
    res.status(200).send("Se ha cerrado la sesión");
  });
});

//Login con github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  async (req, res) => {}
);

//para volver desde la pagina de autorización de github a mi pagina

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "github/error",
  }),
  async (req, res) => {
    const userExists = req.user;

    if (userExists.email === "adminCoder@coder.com") {
      req.session.admin = true;

      req.session.user = {
        first_name: userExists.first_name,
        last_name: userExists.last_name,
        age: userExists.age,
        email: userExists.email,
        rol: "admin",
      };
      return res.redirect("/api/products");
    }

    req.session.user = {
      first_name: userExists.first_name,
      last_name: userExists.last_name,
      age: userExists.age,
      email: userExists.email,
      rol: "user",
    };

    res.redirect("/api/products");
  }
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