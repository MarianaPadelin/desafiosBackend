
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";

export const NuevoProducto = () => {




  return (
    <div>
      <Link to="/NuevoProducto">
        <Button
          variant="outline-dark"
          size="lg"
          style={{ marginLeft: "1vw", display: "inline-flex" }}
        >
          +
        </Button>
      </Link>
    </div>
  );
}
