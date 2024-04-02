import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ProductCard from "./ProductCard";


const ProductCardContainer = () => {

    const { id } = useParams();


    const { agregarProductos, cantidad } = useContext(CartContext);
    const cantidadDeProductos = cantidad(id);

    const onAdd = (elemento,cantidad) => {
      let data = {
        ...elemento,
        quantity: cantidad,
      };

      agregarProductos(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,

        color: "cadetBlue",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "El producto se agregó al carrito",
      });
    };
  return (
    <ProductCard  cantidadDeProductos={cantidadDeProductos} onAdd={onAdd}/>
  )
}

export default ProductCardContainer