import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{ marginTop: "auto", display: "flex", justifyContent: "center" }}
    >
      <Navbar
        style={{
          backgroundColor: "CadetBlue",
          width: "94%",
          justifyContent: "space-evenly",
        }}
      >
        <Navbar.Brand href="#home">
          <Image
            alt="logo"
            src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1685833673/productos/Logo_ve995f.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ marginLeft: 20 }}
            roundedCircle
          />{" "}
          MGGM
        </Navbar.Brand>
        <h5>
          <i id="epigrafe">Cerámica artesanal - Patagonia Argentina</i>
        </h5>

        <Link to="https://www.instagram.com/mggmceramica/" target="_blank">
          <InstagramIcon fontSize="large" style={{ color: "black" }} />
        </Link>
      </Navbar>
    </div>
  );
};

export default Footer;
