const form = document.getElementById("registerForm")
// import Swal from "sweetalert2";

form.addEventListener("submit", e => {
    e.preventDefault();

    //formData es un objeto de js que recopila los campos ingresados en el form
    const data = new FormData(form)
    const obj = {}

    data.forEach((value, key) => (obj[key] = value));

    //esto conecta con lo que hice en postman
    fetch("/api/sessions/register", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      if (result.status === 200) {

        alert("Usuario registrado correctamente")
        window.location.replace("/");
      }
    }).catch((error) => {
       alert("El usuario ya existe")
        console.log(error)
    })
})