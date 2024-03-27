import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./ProductCard.css";
import { Link } from "react-router-dom";
// import { AgregarStock } from "./AgregarStock";
// import { QuitarProducto } from "./QuitarProducto";


export const ProductCard = ({ elemento }) => {
  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card className="tarjeta">
            {/* <QuitarProducto id={elemento.id}  style={{}}/> */}
            <Card.Img className="imgTarjeta" variant="top" src={elemento.img} />

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
            {/* <AgregarStock id={elemento.id} /> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};


