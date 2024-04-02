import { useFormik } from "formik";
import Checkout from "./Checkout";
import * as Yup from "yup";
import { database } from "../../../firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { CartContext } from "../../../context/CartContext";
import { useContext, useState } from "react";
import CompraExitosa from "./CompraExitosa";
import Swal from "sweetalert2";


const CheckoutContainer = () => {
    const {cart, totalPrecio, limpiarCarrito} = useContext( CartContext)
    let total = totalPrecio()
    const [ordenID, setOrdenID] = useState(null)
    const { handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
        nombre: "",
        email: "",
        telefono: "",
        },
    //infoDelComprador son los initialValues con la info ya completada por el usuario
    onSubmit: (infoDelComprador) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,

          color: "cadetBlue",
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "info",
          title: "Preparando la compra",
        });

        let ordenDeCompra = {
                    comprador: {infoDelComprador},
                    items: cart,
                    total: total
                }
                let ordenesDeCompra = collection(database, "orders")
                addDoc(ordenesDeCompra, ordenDeCompra ).then((res)=>setOrdenID(res.id)).catch((err)=>console.log(err))
                
                cart.map((product)=>{
                    updateDoc(doc(database, "products", product.id), {stock: product.stock - product.quantity})
                })
                //el updateDoc me pide la base de datos, la coleccion y el item que quiero modificar, y un objeto con solamente el o los att que quiera modificar. Se ejecuta una vez por cada producto del carrito. 

                limpiarCarrito()
            },

    validateOnChange: false,
    validateOnBlur: true,
    //validationSchema es de formik, ahi adentro uso yup

    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("Campo requerido")
        .min(5, "Debe tener al menos 5 caracteres"),
      email: Yup.string()
        .required("Campo requerido")
        .email("Debe ingresar una dirección de email"),
      telefono: Yup.string().required("Campo requerido"),
    }),
  });

  return (
    <div>
      {ordenID ? (
       <CompraExitosa ordenID={ordenID}/>
      ) : (
        <Checkout
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
        />
      )}
    </div>
  );
};

export default CheckoutContainer;
