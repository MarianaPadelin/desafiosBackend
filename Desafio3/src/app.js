import express from "express";
import { ProductManager, Product } from "../../desafio2/desafio2.js";

//correr con npm run dev, abrir el explorador con localhost:5000
// const express = require('express') => esto se usa con type: common js en package.json

// import ProductManager from "./desafio2";
//ver si hace falta importat con .js
const app = express();
const PORT = 5000;

// 1) Instancio la clase
const prueboProducto = new ProductManager();

// 2) Agrego productos y pruebo las validaciones. Si hay campos vacios o si se repite el código, no se agregan
// prueboProducto.addProduct(
//   new Product(
//     "Producto prueba1",
//     "Este es un producto prueba",
//     2030,
//     "SinImagen",
//     "abc143",
//     "44"
//   )
// );

// console.log(prueboProducto.getProducts());

const arrayPrueba = [
  {
    id: 1,
    nombre: "pepe",
    edad: 40,
  },
  {
    id: 2,
    nombre: "mario",
    edad: 57,
  },
  {
    id: 3,
    nombre: "soledad",
    edad: 37,
  },
  {
    id: 4,
    nombre: "pepe",
    edad: 71,
  },
  {
    id: 5,
    nombre: "pepe",
    edad: 45,
  },
];

app.get("/", async (req, res) => {
  const { nombre, limit } = req.query;
  if (nombre) {
    const usuarios = await arrayPrueba.filter((user) => user.nombre === nombre);

    if (usuarios && limit) {
      usuarios.length = limit;
      return res.json(usuarios);
    } else if (usuarios) {
      return res.json(usuarios);
    } else {
      //acá no llega, muestra []
      return res.send("<h1>Usuario no encontrado</h1>");
    }
  } else {
    res.send("<h1>Inicio</h1>");
  }
});

// app.get("/", (req, res) =>res.json(prueboProducto.getProducts()));

app.get("/productos", (req, res) => {
      const { limit } = req.query;

    if(limit){
        arrayPrueba.length = limit
        return res.json(arrayPrueba)
    } else {
        return res.json(arrayPrueba)
    }
 
});

app.get("/productos/:id", (req, res) => {
  const { id } = req.params;

  const usuario = arrayPrueba.find((user) => user.id === +id);

  if (usuario) {
    return res.json(usuario);
    // return res.send(
    //   `<h1>El usuario es ${arrayPrueba}</h1><a href='./'><button>Ir a home</button></a>`
    // )
  } else {
    return res.send(
      `<h1>No existe el id</h1><a href='./'><button>Ver todos los productos</button></a>`
    );
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${5000}`);
});
