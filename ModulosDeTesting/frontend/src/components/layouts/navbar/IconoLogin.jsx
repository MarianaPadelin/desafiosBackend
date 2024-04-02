import { Button } from "react-bootstrap";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";


import "./Navbar.css";

const IconoLogin = () => {
    const { user } = useContext(UserContext);
  return (
    <>
      {!user ? (
        <div>
          <Link to="/Login">
            <Button
              variant="outline-dark"
              style={{ marginLeft: "auto" }}
              className="botonNav"
            >
              <LoginIcon />
            </Button>
          </Link>
        </div>
      ) : (
        <Link to="/Profile">
          <Button
            variant="outline-dark"
            style={{ marginLeft: "auto" }}
            className="botonNav"
          >
            <LoginIcon />
          </Button>
        </Link>
      )}
    </>
  );
}

export default IconoLogin