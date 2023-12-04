import express from "express";

import handlebars from "express-handlebars";
import __dirname from "./utils.js";

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import homeRouter from "./routes/home.router.js";

import { Server } from "socket.io";
import realTimeProducts from "./routes/realTimeProducts.js";
import { ProductManager, Product } from "./productManager.js";
import { validateSocket } from "./utils/validateSocket.js"

//probar con viewrouter, en lugar de tener cada ruta por separado
// import viewRouter from "./routes/views.routes.js";

const app = express();
const PORT = 8080;

//Websockets
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

const io = new Server(httpServer);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Motor de websockets
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    //main es la plantilla principal
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", homeRouter);
app.use("/realTimeProducts", realTimeProducts);

const productoSocket = new ProductManager("./src/productos.json");

//socket communication
io.on("connection", (socket) => {
  console.log("nuevo cliente conectado");

  socket.on("formProducto", async (data) => {
    console.log(data);
    if (validateSocket(data) === true) {
      console.log("Formulario enviado");
  
      try {
        const nuevoProducto = new Product(
          data.title,
          data.description,
          +data.price,
          data.code,
          data.status,
          data.category,
          +data.stock,
          data.thumbnail
        );
        await productoSocket.addProduct(nuevoProducto);
        socket.emit("listaDeProductos", productoSocket.getProducts());
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("todos los campos deben estar completos");
    }
 
  });

   socket.emit("listaDeProductos", productoSocket.getProducts());
});
