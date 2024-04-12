import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Carrito.css"
import { Box } from "@mui/material";

const CarritoVacio = ({nombreUsuario}) => {
  return (
    <div className="carritoVacio">
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
        Bienvenido {nombreUsuario}
      </Box>
      <img
        src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1688329402/productos/carritoVacio_ziyhxi.png"
        width="200"
        style={{ margin: "3vw" }}
      ></img>
      <h2>El carrito está vacío</h2>
      <h4>¡Mirá todos los productos que hay para llenarlo!</h4>
      <Link to="/">
        <Button className="botonVolver">Ver productos</Button>
      </Link>
    </div>
  );
};

export default CarritoVacio;
