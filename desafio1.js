//Desafío entregable N°1

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {

    let existeCodigo = false;
    this.products.forEach((prod)=>{
        prod.code.includes(product.code)
          ? (existeCodigo = true)
          : (existeCodigo = false);
        // prod.code = product.code ? existeCodigo = true : existeCodigo = false;
    })
    

    if (!existeCodigo) {
      if (this.products.length === 0) {
        product.id = 1;
      } else {
        product.id = this.products[this.products.length - 1].id + 1;
      }
      this.products.push(product);
    } else console.log("Error, el producto ya existe.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(idProducto) {
    const producto = this.products.find(
      (producto) => producto.id === idProducto
    );

    if (!producto) {
      console.log("Not found");
    } else {
        console.log("El producto encontrado es", producto)
    //   return (`El producto encontrado es: ${producto}`);
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.stock = stock);
  }
}

//Pruebas

//1-Instancio la clase ProductManager
const prueboProducto = new ProductManager();

//2-Llamo al método getProducts, me devuelve un array vacío.
console.log(prueboProducto.getProducts());


//3-Llamo al método addProduct, agrega un nuevo producto y le genera un id 1 automáticamente
prueboProducto.addProduct(
  new Product(
    "Producto prueba",
    "Este es un producto prueba",
    200,
    "SinImagen",
    "abc123",
    "25"
  )
);

//4-Llamo nuevamente al método getProducts para mostrar el producto recién agregado
console.log(prueboProducto.getProducts());


//5-Agrego otro producto con el mismo "code"
prueboProducto.addProduct(
  new Product(
    "Producto prueba2",
    "Este es un producto prueba",
    200,
    "SinImagen",
    "abc123",
    "25"
  )
);

//6-Llamo nuevamente al método getProducts, la consola me muestra un mensaje de error porque el código está repetido y sólo me muestra el primer objeto
console.log(prueboProducto.getProducts());

//7-Llamo al método getProductsById, con un id existente
prueboProducto.getProductById(1)

//8-Llamo al método getProductsById, con un id NO existente, la consola devuelve "not found"
prueboProducto.getProductById(5)