import Register from "./Register";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterContainer = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      edad: "",
      email: "",
      contraseña: "",
    },
    onSubmit: async function loginUser(form) {
      const data = await fetch(`http://localhost:8080/api/jwt/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form.nombre,
          last_name: form.apellido,
          age: form.edad,
          email: form.email,
          password: form.contraseña,
        }),
      });
      console.log(data);
      if (data.status === 201) {
        Swal.fire({
          title: "Usuario creado con éxito",
          icon: "success",
          background: "lightGrey",
          confirmButtonColor: "cadetBlue",
          timer: 5000
        });
        return navigate("/Login");
      }
      if (data.status === 404) {
       Swal.fire({
         title: "Error",
         text: "El usuario ya existe",
         icon: "error",
         background: "lightGrey",
         confirmButtonColor: "cadetBlue",
         timer: 5000,
       });
      }
    },

    validateOnChange: false,
    validationSchema: Yup.object({
      nombre: Yup.string().required(),
      apellido: Yup.string().required(),
      edad: Yup.string().required(),
      email: Yup.string().required(),
      contraseña: Yup.string()
        .required()

        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
          "La contraseña debe tener entre 6 y 15 caracteres. Debe tener al menos una mayúscula, una minúscula, un número y un caracter especial."
        ),
    }),
  });

  return (
    <div>
      <Register
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
      />
    </div>
  );
};

export default RegisterContainer;
