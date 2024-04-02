import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CompraExitosa = ({ordenID}) => {
  return (
    <div className="carritoVacio">
      <img
        src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1688835487/productos/carritoExito_u29j2x.png"
        width="200"
        style={{ margin: "3vw" }}
      ></img>
      <h2>Compra realizada con éxito</h2>
      <h4>Su número de comprobante es {ordenID}</h4>
      <Link to="/">
        <Button className="botonVolver">Ver más productos</Button>
      </Link>
    </div>
  );
}

export default CompraExitosa