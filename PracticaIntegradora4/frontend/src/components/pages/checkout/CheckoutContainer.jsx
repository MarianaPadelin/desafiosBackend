import { useFormik } from "formik";
import Checkout from "./Checkout";
import * as Yup from "yup";
// import { database } from "../../../firebaseConfig";
// import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { CartContext } from "../../../context/CartContext";
import { useContext, useState } from "react";
import CompraExitosa from "./CompraExitosa";
import Swal from "sweetalert2";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

const CheckoutContainer = () => {
  const { user } = useContext(UserContext);

  let userEmail = "";
  let nombreUsuario = "";
  let cid = "" ;

  if (user) {
    userEmail = user.email;
    nombreUsuario = user.name;
    cid = user.cart;

  }

  const { cart, totalPrecio, limpiarCarrito } = useContext(CartContext);
  let total = totalPrecio();
  const [ordenID, setOrdenID] = useState(null);
  const { handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      direccion: "",
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

      // let ordenDeCompra = {
      //   // agregar:
      //   // userEmail,
      //   // nombreUsuario,
      //   comprador: { infoDelComprador },
      //   items: cart,
      //   total: total,
      // };



      axios.post(
        `http://localhost:8080/api/carts/${cid}/purchase`
      )
      // let ordenesDeCompra = collection(database, "orders");
      // addDoc(ordenesDeCompra, ordenDeCompra)
      //el ordenId va a ser el mismo que el ticket id de back
        .then((res) => setOrdenID(res.data.result._id))
        .catch((err) => console.log("error llamando a la función" + err));

      // cart.map((product) => {
      //   updateDoc(doc(database, "products", product.id), {
      //     stock: product.stock - product.quantity,
      //   });
      // });
      //el updateDoc me pide la base de datos, la coleccion y el item que quiero modificar, y un objeto con solamente el o los att que quiera modificar. Se ejecuta una vez por cada producto del carrito.

      limpiarCarrito();
    },

    validateOnChange: false,
    validateOnBlur: true,
    //validationSchema es de formik, ahi adentro uso yup

    validationSchema: Yup.object({
      direccion: Yup.string()
        .required("Campo requerido")
        .min(5, "Debe tener al menos 5 caracteres"),
      telefono: Yup.string().required("Campo requerido"),
    }),
  });

  return (
    <div>
      {ordenID ? (
        <CompraExitosa ordenID={ordenID} />
      ) : (
        <Checkout
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          nombreUsuario={nombreUsuario}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

export default CheckoutContainer;
