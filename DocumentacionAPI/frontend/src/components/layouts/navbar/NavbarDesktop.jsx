import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { categorias } from "../../../routes/categorias.js";
import { lineas } from "../../../routes/lineas.js";
import { Link } from "react-router-dom";
import IconoLogin from "./IconoLogin.jsx";
import { CartWidget } from "./CartWidget.jsx";
export const NavbarDesktop = () => {
  return (
    <div>
      <Nav className="me-auto">
        <NavDropdown
          style={{ paddingInline: "1vw" }}
          menuVariant="dark"
          title="Productos"
          id="basic-nav-dropdown"
        >
          {categorias.map(({ id, path, title }) => (
            <Link className="dropdown-item" key={id} to={path}>
              {title}
            </Link>
          ))}
        </NavDropdown>
        <NavDropdown
          style={{ paddingInline: "1vw" }}
          menuVariant="dark"
          title="Líneas"
          id="basic-nav-dropdown"
        >
          {lineas.map(({ id, path, title }) => (
            <Link className="dropdown-item" key={id} to={path}>
              {title}
            </Link>
          ))}
        </NavDropdown>

        <Nav.Link href="/about">Novedades</Nav.Link>
        <Nav.Link href="/info">Información</Nav.Link>
        <Nav.Link href="/contacto">Contacto</Nav.Link>
        <div className="iconosNavbar">
          <CartWidget className="cartWidget" />
          <IconoLogin />
        </div>
      </Nav>
    </div>
  );
};
