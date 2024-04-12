import { useFormik } from "formik";
import Login from "./Login";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { ingresar } from "../../../firebaseConfig";
// import axios from "axios";
const LoginContainer = () => {
  const navigate = useNavigate();

  // Access to fetch at 'https://github.com/login/oauth/authorize?response_type=code&scope=user%3A%20email&client_id=Iv1.7c99009db2e303e2'
  //  (redirected from 'http://localhost:8080/api/jwt/github') from origin 'http://localhost:5173' has been blocked 
  //  by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' 
  //  header is present on the requested resource. If an opaque response serves your needs, set the reques's mode to 'no-cors'
  //   to fetch the resource with CORS disabled.

  const ingresarConGithub = async () => {
    await fetch(`http://localhost:8080/api/jwt/github`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        return navigate("/");
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
      contraseña: Yup.string().required(),
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
      ingresarConGithub={ingresarConGithub}
    />
  );
};

export default LoginContainer;
