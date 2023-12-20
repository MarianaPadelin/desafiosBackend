import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import __dirname from "./dirname.js";
import viewRouter from "./Routes/views.routes.js";
import productRouter from "./Routes/product.routes.js"
import cartRouter from "./Routes/cart.routes.js"
import { Server } from "socket.io";
import messagesDao from "./daos/dbManager/messages.dao.js";
// import { ProductManager, Product } from "./productManager.js";
// import { validateSocket } from "./utils/validateSocket.js";

const app = express();
const PORT = 8080;


//Websockets
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

const io = new Server(httpServer);

//este array lo tengo que guardar en mongo
const messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", (data) => {
    console.log(data.message);
    messages.push(data);
    //me falta agarrar el user acá para mandarselo por parametro
    //data.user, data.message
    messagesDao.addMessage(data)
    io.emit("messages", messages);
  });

  socket.on("inicio", (data) => {
    io.emit("messages", messages);
    socket.broadcast.emit("connected", data);
    // messagesDao.addMessage(data, "mensaje1")
  });

  socket.emit("messages", messages);
});


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongoose

mongoose
  .connect("mongodb://127.0.0.1:27017/PracticaIntegradora")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Hubo un error de conexión" + err);
  });

//Motor de handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

//solo dejar viewsrouter
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/", viewRouter);

// const productoSocket = new ProductManager("./src/productos.json");

//socket communication
// io.on("connection", (socket) => {
//   console.log("nuevo cliente conectado");

//   socket.on("formProducto", async (data) => {
//     console.log(data);
//     if (validateSocket(data) === true) {
//       console.log("Formulario enviado");
//       socket.emit("validacion", "ok");
//       try {
//         const nuevoProducto = new Product(
//           data.title,
//           data.description,
//           +data.price,
//           data.code,
//           data.status,
//           data.category,
//           +data.stock,
//           data.thumbnail
//         );
//         await productoSocket.addProduct(nuevoProducto);
//         socket.emit("listaDeProductos", productoSocket.getProducts());
//       } catch (e) {
//         console.log(e);
//       }
//     } else {
//       console.log("todos los campos deben estar completos");
//       socket.emit("validacion", "error");
//     }
//   });

//   socket.emit("listaDeProductos", productoSocket.getProducts());
// });

// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
