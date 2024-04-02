import { Contacto } from "./Contacto"
import "./Contacto.css"
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

export const ContactoContainer = () => {
   const form = useRef();
   let [nombre, setNombre] = useState('')
   let [email, setEmail] = useState('')
   let [mensaje, setMensaje] = useState('')
  

   const sendEmail = (e) => {
     e.preventDefault();

     emailjs
     //ver esto
       .sendForm(
         "service_prdid6s",
         "template_tixappe",
         form.current,
         "kHIj_9PsmqbGchRXG"
       )
       .then(
         () => {
           const Toast = Swal.mixin({
             toast: true,
             position: "center",
             showConfirmButton: false,
             timer: 3000,
             timerProgressBar: true,
             didOpen: (toast) => {
               toast.addEventListener("mouseenter", Swal.stopTimer);
               toast.addEventListener("mouseleave", Swal.resumeTimer);
             },
           });

           Toast.fire({
             icon: "success",
             title: "Email enviado",
           });
           setNombre('')
           setEmail('')
           setMensaje('')

         },
         
         (error) => {
           const Toast = Swal.mixin({
             toast: true,
             position: "center",
             showConfirmButton: false,
             timer: 3000,
             timerProgressBar: true,
             didOpen: (toast) => {
               toast.addEventListener("mouseenter", Swal.stopTimer);
               toast.addEventListener("mouseleave", Swal.resumeTimer);
             },
           });

           Toast.fire({
             icon: "error",
             title: "No se pudo enviar, intente de nuevo más tarde",
           });
           console.error("no se envio", error);
         }
       );
   };
  return (
    <div>
      <Contacto
        sendEmail={sendEmail}
        form={form}
        nombre={nombre}
        email={email}
        mensaje={mensaje}
        setNombre={setNombre}
        setEmail={setEmail}
        setMensaje={setMensaje}
      />
    </div>
  );
}
