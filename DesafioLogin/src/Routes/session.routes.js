import { Router } from "express";
import { userModel } from "../Models/user.model.js";

const router = Router()

//Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log("registrando usuario")
    console.log(req.body)
    try{

    //validamos si el user existe
    const userExists = await userModel.findOne({  email })
    if (userExists){
        console.log("El usuario ya existe")
        return res.status(400).send({ status: "error", message: "El usuario ya existe" })
    }
    

    const user = {
        name,
        email,
        password //eso lo tengo que encriptar
    }

    const result = await userModel.create(user)
    res.status(200).send({ status: "success", message: `Usuario registrado correctamente con Id:${result._id} ` });
    //ver si está bien el _id o es id

    } catch(error){
        console.log("Error de register", error)
        return res.status(401).send("error de register");
    }
})


//Login

router.post("/login", async (req, res) => {
 const { email, password } = req.body;
 console.log(email, password)

  try {
    const userExists = await userModel.findOne({ email, password });// cuando esté encriptado no puedo buscarlo así

    if(!userExists){
        return res
          .status(401)
          .send({ status: "error", message: "Usuario o contraseña incorrectos" });
    }

    //info que va a aparecer en la página una vez logueado el usuario
    console.log(req.session)

    // cannot read properties of undefined (setting 'user')
    req.session.user = {
        email: userExists.email,
    }

  

    res
      .status(200)
      .send({
        status: "success",
        message: `Usuario logueado correctamente`,
        payload: req.session.user
      });


  } catch (error) {
    console.log("Error de login", error);
    return res.status(401).send("error de login")
  }
});

export default router