import { useFormik } from "formik";
import Login from "./Login";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { ingresar } from "../../../firebaseConfig";
// import axios from "axios";
const LoginContainer = () => {
  const navigate = useNavigate();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      usuario: "",
      contraseña: "",
    },
    onSubmit: async function loginUser(form) {
      const data = await fetch(`http://localhost:8080/api/jwt/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.usuario,
          password: form.contraseña,
        }),
      });
      console.log(data);
      if (data.status === 202) {
        Swal.fire({
          title: "Usuario premium conectado",
          icon: "success",
          background: "lightGrey",
          confirmButtonColor: "cadetBlue",
          timer: 5000,
        });
        return navigate("/Profile");
      }
      if (data.status === 201) {
           Swal.fire({
             title: "Administrador conectado",
             icon: "success",
             background: "lightGrey",
             confirmButtonColor: "cadetBlue",
             timer: 5000,
           });
        return navigate("/NuevoProducto");
      }
      if (data.status === 200) {
           Swal.fire({
             title: "Usuario conectado",
             icon: "success",
             background: "lightGrey",
             confirmButtonColor: "cadetBlue",
             timer: 5000,
           });
        return navigate("/Profile");
      }
         Swal.fire({
           title: "Error al conectarse",
           text: "Usuario o contraseña incorrectas",
           icon: "error",
           background: "lightGrey",
           confirmButtonColor: "cadetBlue",
           timer: 5000,
         });

    },


    validateOnChange: false,
    validationSchema: Yup.object({
      usuario: Yup.string().min(5, "debe tener más de 5 caracteres"),
      contraseña: Yup.string().required()
      //ESTO PONERLO EN REGISTER
      // .matches(
      //   /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
      //   "La contraseña debe tener entre 6 y 15 caracteres. Debe tener al menos una mayúscula, una minúscula, un número y un caracter especial."
      // ),
    }),
  });

  return (
    <Login
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
    />
  );
};

export default LoginContainer;
