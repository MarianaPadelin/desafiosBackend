import express from "express";
import handlebars from "express-handlebars";

import MongoStore from "connect-mongo";
import MongoSingleton from "./config/mongodb.singleton.js";

import passport from "passport";
import inicializePassport from "./config/passport.config.js";

import __dirname from "./dirname.js";
import cors from "cors";
import compression from "express-compression";

import viewRouter from "./Routes/VIEWS/views.routes.js";
import productRouter from "./Routes/API/product.routes.js";
import usersViewsRouter from "./Routes/VIEWS/user.views.routes.js";
import githubViewRouter from "./Routes/VIEWS/github.views.routes.js";
import cartRouter from "./Routes/API/cart.routes.js";
import jwtRouter from "./Routes/API/jwt.routes.js";
import ticketRouter from "./Routes/API/ticket.routes.js"
import mockingRouter from "./Routes/API/mocking.routes.js"

import { Server } from "socket.io";
import messagesDao from "./Services/DAOS/mongoDB/messages.dao.js";

import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import session from "express-session";
import cookieParser from "cookie-parser";

import config from "./config/config.js";

const app = express();
const PORT = config.port;

//Websockets
const httpServer = app.listen(PORT, () =>
  console.log(` -----  Server listening on port ${PORT} ----- `)
);

const io = new Server(httpServer);

const messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", (data) => {
    messages.push(data);

    messagesDao.addMessage(data);
    io.emit("messages", messages);
  });

  socket.on("inicio", (data) => {
    io.emit("messages", messages);
    socket.broadcast.emit("connected", data);
  });

  socket.emit("messages", messages);
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
app.use(cors());

// GZIP (comprime data para cargarla de forma más eficiente)
app.use(compression(  { brotli: { enabled: true, zlib: {} } }))

//mongoose con singleton
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.log(error);
  }
};
mongoInstance();


//Motor de handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

//Sessions
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 10 * 60,
    }),

    secret: config.secret,
    resave: false,
    saveUninitialized: true, //guarda la sesion aunque no hayamos hecho login
  })
);

// Middleware de passport

inicializePassport();
app.use(passport.initialize());
app.use(passport.session());

//cookie parser (se le pasa un secreto como parámetro)
app.use(cookieParser(config.secret));

//views
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/", viewRouter);
app.use("/users", usersViewsRouter);
app.use("/github", githubViewRouter);
app.use("/api/jwt", jwtRouter);
app.use("/ticket", ticketRouter);
app.use("/mockingproducts", mockingRouter);
