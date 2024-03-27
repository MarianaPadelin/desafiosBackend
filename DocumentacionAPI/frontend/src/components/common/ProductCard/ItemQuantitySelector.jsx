import { useCount } from "../../../hooks/useCount";
import "./ProductCard.css";
import { Button } from "react-bootstrap";

export const ItemQuantitySelector = ({ stock, initial = 1, onAdd }) => {
  const { total, restar, sumar } = useCount(initial, stock);

  return (
    <>
      <div className="count--container">
        <Button
          className="detalle"
          variant="outline-dark"
          onClick={restar}
        >
          -
        </Button>
        <span>{total}</span>
        <Button
          className="detalle"
          variant="outline-dark"
          onClick={sumar}
        >
          +
        </Button>

        <Button
          className="botonComprar"
          variant="dark"
          onClick={() => onAdd(total)}
        >
          Agregar al carrito
        </Button>
      </div>
    </>
  );
};
