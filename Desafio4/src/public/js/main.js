// import { validateSocket } from "../../utils/validateSocket.js";
//console error: Cannot use import statement outside a module



//inicializo socket desde cliente
const socket = io();
 

//falta cartel de sweet alert
//falta emprolijar la tabla
//----------------------------------------------------
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const product = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    code: formData.get("code"),
    status: formData.get("status"),
    category: formData.get("category"),
    stock: Number(formData.get("stock")),
    thumbnail: formData.get("thumbnail"),
  };

//   console.log(validateSocket(product));
//   if (validateSocket(product) === true) {
    Swal.fire({
      title: "Formulario enviado",
      icon: "success",
    });
//   } else {
//     Swal.fire({
//       title: "Error, todos los campos deben estar completos",
//       icon: "error",
//     });
//   }
  socket.emit("formProducto", product);
  form.reset();
});

socket.on("listaDeProductos", (data) => {
  const listaDeProductos = document.querySelector("#products");

  listaDeProductos.innerHTML = data.map((post) => {
      return `

      
            <td>${post.id}</td>
            <td> ${post.title}</td>
            <td>${post.description}</td>
            <td>${post.price}</td>
            <td>${post.code}</td>
            <td>${post.status}</td>
            <td>${post.category}</td>
            <td>${post.stock}</td>
            <td>${post.thumbnail}</td>
            <td><button>X</button></td>
      
       `;
    })
    .join(" ");
});
