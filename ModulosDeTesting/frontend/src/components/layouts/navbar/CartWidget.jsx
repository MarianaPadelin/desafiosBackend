import { AiOutlineShoppingCart } from "react-icons/ai";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

export const CartWidget = () => {
  const {totalElementos} = useContext(CartContext)
  let elementosEnCarrito = totalElementos()
  return (
    <>
    <Link to="/Carrito">
      <Button variant="outline-dark" className="cartWidget">
        <AiOutlineShoppingCart />
        <Badge pill bg="danger">
          {elementosEnCarrito}
        </Badge>
      </Button>
      </Link>
    </>
  );
}
