import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

//creo el contexto
export const CartContext = createContext();

//creo un componente que va a ser el proveedor del contexto
export const CartContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [cart, setCart] = useState([]);

  //  const settingCart = () => {
  //si le saco el useEffect anda bien pero el codigo de back se reinicia constantemente
  useEffect(() => {
    let cid = "";

    if (user) {
      cid = user.cart;
      // console.log(user.cart)
    }
    axios
      .get(`http://localhost:8080/users/cart/${cid}`)
      .then((res) => {
        //  console.log(cid);
        // let cartFound = res.data.products
        // console.log(cartFound)

        return setCart(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //  };

  const agregarProductos = (nuevo) => {
    // let existe = elementosRepetidos(nuevo.id);
    // if (existe) {
    //   let nuevoArray = cart.map((producto) => {
    //     if (producto.id === nuevo.id) {
    //       return {
    //         ...producto,
    //         quantity: nuevo.quantity,
    //       };
    //     } else {
    //       return producto;
    //     }
    //   });
    let cid = user.cart;
    axios.post(`/api/carts/${cid}/product/${nuevo.id}`).then((res) => {
      setCart(res);
    });

    // localStorage.setItem("cart", JSON.stringify(nuevoArray));
    // } else {
    //   setCart([...cart, nuevo]);
    //   localStorage.setItem("cart", JSON.stringify([...cart, nuevo]));
    // }
  };

  //si no hay elementos iguales en el carrito los agrego, si ya están solo aumento su cantidad
  // const elementosRepetidos = (id) => {
  //   let existeElemento = cart.some((elemento) => elemento._id === id);
  //   return existeElemento;
  // };

  const limpiarCarrito = () => {
    if (user) {
      let cid = user.cart;
      axios.delete(`/api/carts/${cid}`).then((res) => setCart(res));
    }
  };

  const eliminarElemento = (pid) => {
    if (user) {
      let cid = user.cart;
      axios.delete(`/api/carts/${cid}/product/${pid}`).then((res) => {
        setCart(res);
      });
    }
  };

  // const cantidad = (pid) => {
  //   //Esto se usa en itemDetail

  //   // if(user !== null){
  //   //    let cid = user.cart;
  //   //   console.log(cart)
  //   //   console.log(pid)
  //   //   axios.get(`/api/carts/${cid}`)
  //   //   .then((res) => {
  //   //     console.log(res)
  //   //     let productExists = res.data.cart.products.find((elemento) => elemento._id === pid)
  //   //     console.log(productExists)
  //   //   })

  //     // console.log(cart.data.result.poroducts);
  //   }

  // let producto = cart.find((elemento) => elemento._id === id);
  // return producto?.quantity;
  //   return 3
  //   //si no es undefined, pide la cantidad
  // };

  const totalElementos = () => {
    if (user) {
      if (cart.length > 0) {
        let total = cart.reduce((acc, elemento) => {
          return acc + elemento.quantity;
        }, 0);
        return total;
      } else return 0;
    }
  };

  const totalPrecio = () => {
    if (user && cart.length > 0) {
      // console.log(cart);
      let total = cart.reduce((acc, elemento) => {
        return acc + elemento._id.price * elemento.quantity;
      }, 0);
      return total;
    } else return 0;
  };

  const precioConDescuento = () => {
    let totalDescuento = totalPrecio() * 0.9;
    return totalDescuento;
  };

  const totalPeso = () => {
    //tengo que agregar el peso del producto en la db
    let total = 6;
    // let total = cart.reduce((acc, elemento) => {
    //   return acc + elemento.peso * elemento.quantity;
    // }, 0);
    return total;
  };

  //el costo de envío está basado en el costo de las encomiendas de Correo Argentino, que varía dependiendo de su peso en kg.
  const costoEnvio = () => {
    //actualizar esto
    if (totalPeso() < 1) {
      return 2340;
    } else if (totalPeso() >= 1 && totalPeso() < 5) {
      return 2850;
    } else if (totalPeso() >= 5 && totalPeso() < 10) {
      return 3730;
    } else if (totalPeso() >= 10 && totalPeso() < 15) {
      return 4600;
    } else if (totalPeso() >= 15 && totalPeso() < 20) {
      return 5400;
    } else {
      return 6600;
    }
  };

  const sumaPrecios = () => {
    let sumaPrecios = costoEnvio() + totalPrecio();
    return sumaPrecios;
  };

  //acá voy a poner todos los elementos que quiera usar en otro lado de la pagina
  let data = {
    cart,
    agregarProductos,
    limpiarCarrito,
    eliminarElemento,
    // cantidad,
    totalElementos,
    totalPrecio,
    precioConDescuento,
    totalPeso,
    costoEnvio,
    sumaPrecios,
  };

  return (
    //pongo a disposición el contexto con children
    <CartContext.Provider value={data}> {children}</CartContext.Provider>
  );
};
