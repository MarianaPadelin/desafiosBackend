import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import "./ItemDetail.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ItemQuantitySelector } from "../../common/ProductCard/ItemQuantitySelector";

export const ItemDetail = ({seleccionado, onAdd}) => {

  return (
    <div>
      <Card className="card">
        <Card.Header as="h3">{seleccionado.title}</Card.Header>
        <Card.Body>
          <Carousel>
            <Carousel.Item>
              <Container className="containerImg">
                <img
                  className="d-flex"
                  src={seleccionado.thumbnails[0]}
                  alt="Primer foto"
                  style={{ height: 400 }}
                />
              </Container>
            </Carousel.Item>
            <Carousel.Item>
              <Container className="containerImg">
                <img
                  className="d-flex"
                  src={seleccionado.thumbnails[1]}
                  alt="Segunda foto"
                  style={{ height: 400 }}
                />
              </Container>
            </Carousel.Item>
          </Carousel>
          <br></br>
          <div style={{ marginLeft: "3vw" }}>
            <Card.Text as="h4">
              <b>{seleccionado.description}</b>
            </Card.Text>
            <Card.Title>CATEGORÍA: {seleccionado.category}</Card.Title>
            {/* <Card.Title>LÍNEA: {seleccionado.linea}</Card.Title> */}
            <br></br>

            {seleccionado.stock > 0 ? (
              <div>
                <Card.Title as="h3">${seleccionado.price} </Card.Title>
                <ItemQuantitySelector
                  stock={seleccionado.stock}
                  initial={1}
                  onAdd={onAdd}
                />
              </div>
            ) : (
              <Card.Footer as="h3">SIN STOCK</Card.Footer>
            )}

            <br></br>
          </div>
          <Link to="/">
            <Button className="botonVolver">Volver</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};
