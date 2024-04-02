import { Button } from "react-bootstrap";

const Profile = ({ user, cerrarSesion }) => {
  return (
    <div>
      <h1>Bienvenido</h1>
      {/* {console.log(user.data.name)} */}
      {!!user && <h2>Hola {user.data.name}</h2>}

      <Button className="botonVolver" onClick={cerrarSesion}>
        Cerrar sesión
      </Button>
    </div>
  );
};

export default Profile;
