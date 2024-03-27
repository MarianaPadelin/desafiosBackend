import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Carrito.css"

const CarritoVacio = () => {
  return (
    <div className="carritoVacio">    
        <img
          src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1688329402/productos/carritoVacio_ziyhxi.png"
          width="200"
          style={{ margin: "3vw"}}
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
