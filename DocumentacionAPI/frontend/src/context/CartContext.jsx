import { createContext, useState } from "react";

//creo el contexto
export const CartContext = createContext();

//creo un componente que va a ser el proveedor del contexto
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );



const agregarProductos =(nuevo)=> {
    let existe = elementosRepetidos(nuevo.id)
    if(existe){
        let nuevoArray = cart.map(producto=>{
            if (producto.id === nuevo.id){
                return {
                    ...producto,
                    quantity: nuevo.quantity
                }

            }else {
                return producto
            }
        })
        setCart(nuevoArray)
        localStorage.setItem("cart", JSON.stringify(nuevoArray));
    }else {
        setCart([...cart, nuevo])
         localStorage.setItem("cart", JSON.stringify([...cart, nuevo]));

    }
}

  //si no hay elementos iguales en el carrito los agrego, si ya están solo aumento su cantidad
  const elementosRepetidos = (id) => {
    let existeElemento = cart.some((elemento) => elemento.id === id);
    return existeElemento;
  };

  const limpiarCarrito = () => {
    setCart([])
    localStorage.removeItem("cart")}

  const eliminarElemento = (id) => {
    let arraySinElemento = cart.filter((producto) => producto.id !== id)
    setCart(arraySinElemento)
    localStorage.setItem("cart", JSON.stringify(arraySinElemento));
  }

  const cantidad = (id) => {
    let producto = cart.find(elemento => elemento.id === id)
    return producto?.quantity
    //si no es undefined, pide la cantidad
  }


  const totalElementos = () => {
    let total = cart.reduce((acc, elemento)=> {
        return acc + elemento.quantity
    }, 0)
    return total
  }

  const totalPrecio = () => {
    let total = cart.reduce((acc, elemento) => {
    return acc + (elemento.price* elemento.quantity)
  }, 0);
  return total;}

  const precioConDescuento = () => {
    let totalDescuento = totalPrecio()*0.9
    return totalDescuento
  }

  const totalPeso = () => {
    let total = cart.reduce((acc,elemento) => {
        return acc + (elemento.peso * elemento.quantity)
    }, 0)
    return total}


    //el costo de envío está basado en el costo de las encomiendas de Correo Argentino, que varía dependiendo de su peso en kg. 
const costoEnvio = () => {
    if (totalPeso() < 1){
        return 2340
    }else if (totalPeso() >=1 && totalPeso()<5){
        return 2850
    }else if (totalPeso() >= 5 && totalPeso()<10){
        return 3730
    }else if (totalPeso() >=10 && totalPeso()<15){
        return 4600
    }else if (totalPeso() >= 15 && totalPeso() < 20) {
      return 5400
    } else {
      return 6600
    }
}

const sumaPrecios = () => {
    let sumaPrecios = costoEnvio() + totalPrecio()
    return sumaPrecios
}


  //acá voy a poner todos los elementos que quiera usar en otro lado de la pagina
  let data = {
    cart,
    agregarProductos,
    limpiarCarrito,
    eliminarElemento,
    cantidad,
    totalElementos,
    totalPrecio,
    precioConDescuento,
    totalPeso,
    costoEnvio, 
    sumaPrecios
  };

  return (
    //pongo a disposición el contexto con children
    <CartContext.Provider value={data}> {children}</CartContext.Provider>
  );
}