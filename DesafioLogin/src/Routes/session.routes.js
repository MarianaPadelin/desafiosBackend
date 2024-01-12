import { Router } from "express";
import { userModel } from "../Models/user.model.js";

const router = Router();

//Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("registrando usuario");
  console.log(req.body);
  try {

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      console.log("El usuario ya existe");

      return res
        .status(400)
        .send({ status: "error", message: "El usuario ya existe" });
    }

    const user = {
      name,
      email,
      password, //eso lo tengo que encriptar
    };

    const result = await userModel.create(user);
    res
      .status(200)
      .send({
        status: "success",
        message: `Usuario registrado correctamente con Id:${result._id} `,
      });

  } catch (error) {
    console.log("Error de register", error);
    return res.status(401).send("error de register");
  }
});

//Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const userExists = await userModel.findOne({ email, password }); // cuando esté encriptado no puedo buscarlo así

    if (!userExists) {
      return res
        .status(401)
        .send({ status: "error", message: "Usuario o contraseña incorrectos" });
    }
    if (
      userExists.email === "adminCoder@coder.com" &&
      userExists.password === "adminCod3r123"
    ) {
      console.log("entró el admin" + userExists);
      req.session.admin = true;

      req.session.user = {
        name: userExists.name,
        email: userExists.email,
        rol: "admin",
      };

      res.status(200).send({
        status: "success",
        message: `Usuario logueado correctamente`,
        payload: req.session.user,
      });
    } else {
      //info que va a aparecer en la página una vez logueado el usuario

      req.session.user = {
        name: userExists.name,
        email: userExists.email,
        rol: "user",
      };

      res.status(200).send({
        status: "success",
        message: `Usuario logueado correctamente`,
        payload: req.session.user,
      });
    }
  } catch (error) {
    console.log("Error de login", error);
    return res.status(401).send("error de login");
  }
});

//Logout

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: "Error de logout", msg: "Error al cerrar la session" });
    }
    res.status(200).send("Se ha cerrado la sesión");
  });
});

export default router;
