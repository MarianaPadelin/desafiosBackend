import Profile from "./Profile"
import { useContext } from "react"
import { UserContext } from "../../../context/UserContext"
import Swal from "sweetalert2"

const ProfileContainer = () => {
    //con esto llamo al usuario en las vistas que quiera
    const { user } = useContext(UserContext)

    const cerrarSesion = () => {
        fetch("http://localhost:8080/api/jwt/logout", {
          method: "GET",
          credentials: "include",
        })
        .then(() => {
          Swal.fire({
            title: "Se cerró la sesión",
            icon: "success",
            background: "lightGrey",
            confirmButtonColor: "cadetBlue",
            timer: 5000,
          });
        })
        .catch((error) => {
          console.log(error)
        })
    }

  return (
    <div>
      <Profile user={user} cerrarSesion={cerrarSesion} />
    </div>
  );
}

export default ProfileContainer