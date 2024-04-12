import { Box, Card, CardContent, Paper } from "@mui/material";
import { Button } from "react-bootstrap";
import "./Profile.css";

const Profile = ({ user, cerrarSesion }) => {
  return (
    <div>
      <Box
        component="section"
        sx={{
          p: 2,
          border: "1px solid cadetBlue",
          bgcolor: "cadetBlue",
          fontSize: "28px",
          marginTop: "3vh",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <h1>Perfil de usuario de {!!user && user.name}</h1>
        {/* {console.log(user.name)} */}
      </Box>

      <Box
        className="datosPerfil"
      >
        <Paper elevation={10}>
          <Card>
            <CardContent className="contenido">
              <b> Nombre: </b>
              {user.name}
              <br />
              <b>Email: </b>
              {user.email}
              <br />
              <b>Edad:</b>
              {user.age} años
              <Button className="botonVolver" onClick={cerrarSesion}>
                Cerrar sesión
              </Button>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </div>
  );
};

export default Profile;
