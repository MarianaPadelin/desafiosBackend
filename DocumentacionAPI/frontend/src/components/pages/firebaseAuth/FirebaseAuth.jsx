import { Button } from "react-bootstrap"
import { login } from "../../../firebaseConfig"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";


export const FirebaseAuth = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()

    //esto lo saco del onchange
    let infoInput = {
      email: "probandologin@gmail.com",
      password: "123456"
    };

    //esto va en el onsubmit
    const handleSubmit= async () => {
        let res = await login(infoInput)
        console.log(res)
        setUser(res)
        //guardar la res en un estado global
        navigate("/")
    }

    //guardar el accesToken en localStorage
    //ver rutas protegidas con react router dom
  return (
    <div>
        <h1>login</h1>
        <Button onClick={handleSubmit}> Ingresar </Button>
    </div>
  )
}
