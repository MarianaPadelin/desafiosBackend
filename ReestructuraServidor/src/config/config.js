import dotenv from "dotenv"
import program from "../process.js";



//tendria que importar y usar program para poder cambiar el entorno directamente desde la consola:
const environment = program.opts().mode
// const environment = "prod"
dotenv.config({
    //para más de un entorno
    path: environment === "prod" ? "./src/config/.env.prod" : "./src/config/.env.dev"
})


export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    secret: process.env.secret,
    privateKey: process.env.PRIVATE_KEY,
    adminMail: process.env.ADMIN_MAIL,
    adminPass: process.env.ADMIN_PASSWORD,
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
}