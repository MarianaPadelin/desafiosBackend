import path from "path";

import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

//generamos la encriptación de contraseña, de manera sincrónica: 
export const createHash = (hashPass) =>
  bcrypt.hashSync(hashPass, bcrypt.genSaltSync(10));

//validamos la encriptación:

export const validatePass = (user, hashPass) => {
  // console.log(
  //   `Datos a validar: userpassword = ${user.password} y contraseña = ${hashPass}`
  // );
  return bcrypt.compareSync(hashPass, user.password);
};

//JWT

//esto ponerlo en .env:
export const PRIVATE_KEY = "PrivateKeyBackend"


export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "240s" });

};

//middleware para el manejo de errores

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    console.log("Entrando a llamar strategy: ");
    console.log(strategy);

    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      console.log("Usuario obtenido del strategy: ");
      console.log(user);
      req.user = user;
      next();
    })(req, res, next);
  };
};


export const authToken = (req, res, next) => {
    //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth:");
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).send({ error: "User not authenticated or missing token." });
    }
    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    //Validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "Token invalido." });
        //Token OK
        req.user = credentials.user;
        console.log("Esta es la informacion del Token:");
        console.log(req.user);
        next();
    });
};




//autorizamos quien puede ver las paginas segun el rol
export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT")

        if (req.user.role !== role) {
            return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol.");
        }
        next()
    }
};

export default __dirname;
