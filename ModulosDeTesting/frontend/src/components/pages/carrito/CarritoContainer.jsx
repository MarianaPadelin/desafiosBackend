import { useContext, useState } from "react";
import Carrito from "./Carrito";
import { CartContext } from "../../../context/CartContext";
import CarritoVacio from "./CarritoVacio";
import Swal from "sweetalert2";
import { useFormik } from "formik";
// import { UserContext } from "../../../context/UserContext";

const CarritoContainer = () => {
  //consumo el contexto carrito, le tengo que poner qué contexto uso
  // const { user } = useContext(UserContext);
  
  const { cart, limpiarCarrito, eliminarElemento, totalPrecio, precioConDescuento, totalPeso, costoEnvio, sumaPrecios } =
    useContext(CartContext);

  const preguntaLimpiar = () => {
    Swal.fire({
      title: "¿Vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      background: "lightGrey",
      confirmButtonColor: "cadetBlue",
      cancelButtonColor: "lightCoral",
      confirmButtonText: "Vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        limpiarCarrito();
        Swal.fire({
          title: "Listo",
          text: "El carrito se vació",
          icon: "success",
          background: "lightGrey",
          confirmButtonColor: "cadetBlue",
        });
      }
    });
  };

  let darPrecioTotal = totalPrecio();
  let darPesoTotal = totalPeso();
  let totalEnvio = costoEnvio();

  const[descuentoAplicado, setDescuentoAplicado] = useState(null)

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      codigo: "",
    },

    onSubmit: (data) => {
      if (data.codigo == "MARGACERAMICA") {
         Swal.fire({
           icon: "success",
           titleText: "El precio con descuento es $"+ precioConDescuento(),
           text:"Se aplicará al finalizar la compra",
           background: "lightGrey",
           confirmButtonColor: "cadetBlue",
         });
         setDescuentoAplicado(precioConDescuento)
      } else {
        Swal.fire({
          icon: "error",
          title: "Código no válido",
          text: "Pruebe otro código",
          background: "lightGrey",
          confirmButtonColor: "cadetBlue",
        });
        setDescuentoAplicado(darPrecioTotal)
      }
    },
  });


  let precioFinal = descuentoAplicado ? (descuentoAplicado + totalEnvio) : sumaPrecios()

  return (
    <>
      {cart.length > 0 ? (
        <Carrito
          cart={cart}
          eliminarElemento={eliminarElemento}
          preguntaLimpiar={preguntaLimpiar}
          darPrecioTotal={darPrecioTotal}
          darPesoTotal={darPesoTotal}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          totalEnvio={totalEnvio}
          precioFinal={precioFinal}
        />
      ) : (
        <CarritoVacio />
      )}
    </>
  );
};

export default CarritoContainer;
