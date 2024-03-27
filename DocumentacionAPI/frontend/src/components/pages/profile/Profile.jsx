import { Button } from "react-bootstrap";

const Profile = ({ user, cerrarSesion }) => {
  return (
    <div>
      <h1>Bienvenido</h1>
      {!!user && <h2>Hola {user.first_name}</h2>}

      <Button className="botonVolver" onClick={cerrarSesion}>
        {" "}
        Cerrar sesión{" "}
      </Button>
    </div>
  );
};

export default Profile;
