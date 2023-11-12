//Desafío entregable N°3

import express from "express";
import { ProductManager } from "./productManager.js";

const app = express();
const PORT = 8080;

// Instancio la clase
const prueboProducto = new ProductManager();

// console.log(prueboProducto.getProducts());

app.get("/", async (req, res) => {
  res.send(
    "<h1>Inicio</h1><a href='/products'><button>Ver los productos</button></a>"
  );
});

app.get("/products", async (req, res) => {
  const datosImportados = await prueboProducto.getProducts();
  const { limit } = req.query;

  if (limit && limit <= datosImportados.length) {
    datosImportados.length = limit;
    return res.send(datosImportados);
  } else {

    //hasta acá llega bien, pero si cambio el limite me devuelve la misma longitud del limite que puse anteriormente.
    console.log(datosImportados)
    return res.send(datosImportados)
  }
});

app.get("/products/:id", async (req, res) => {
  let datosImportados = await prueboProducto.getProducts();
  const { id } = req.params;

  const usuario = datosImportados.find((user) => user.id === +id);

  if (usuario) {
    return res.send(usuario);
  } else {
    return res.send(
      `<h1>No existe el id</h1><a href='./'><button>Ver todos los productos</button></a>`
    );
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
