import { Button } from "react-bootstrap";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import "./Navbar.css";

const IconoLogin = () => {
  return (
    <>
      <Link to="/Login">
        <Button variant="outline-dark" style={{ marginLeft: "auto" }} className="botonNav">
          <LoginIcon />
        </Button>
      </Link>
    </>
  );
}

export default IconoLogin