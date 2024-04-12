import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { AgregarStock } from "./AgregarStock";
import { QuitarProducto } from "./QuitarProducto";
import { EditarProducto } from "./EditarProducto"


export const ProductCard = ({ elemento }) => {
  const {user} = useContext(UserContext)

  
  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card className="tarjeta">
            <span className="botonesAdmin">
              {user !== null && user.role === "admin" && (
                <QuitarProducto id={elemento.id} />
              )}
              {user !== null && user.role === "admin" && (
                <EditarProducto id={elemento.id} />
              )}
            </span>

            <Card.Img className="imgTarjeta" variant="top" src={elemento.img[0]} />

            <Card.Body>
              <Card.Title>{elemento.title}</Card.Title>
              <Card.Text>{elemento.description}</Card.Text>
              <Card.Text>Tamaño: {elemento.tamaño}</Card.Text>
              <Link to={`/DetalleProducto/${elemento.id}`}>
                <Button className="detalle" variant="outline-dark">
                  Ver detalle
                </Button>
              </Link>
              {elemento.stock > 0 ? (
                <Card.Footer className="precios">${elemento.price}</Card.Footer>
              ) : (
                <Card.Footer as="h3">SIN STOCK</Card.Footer>
              )}
            </Card.Body>
   
              {user !== null && user.role === "admin" && (
                <AgregarStock id={elemento.id} />
              )}
          </Card>

        </Col>
      </Row>
    </div>
  );
};


