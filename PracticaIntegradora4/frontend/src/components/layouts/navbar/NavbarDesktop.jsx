import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { categorias } from "../../../routes/categorias.js";
// import { lineas } from "../../../routes/lineas.js";
import { Link } from "react-router-dom";
import IconoLogin from "./IconoLogin.jsx";
import { CartWidget } from "./CartWidget.jsx";
import { UserContext } from "../../../context/UserContext.jsx";
import { NuevoProducto } from "./NuevoProducto.jsx";
import { useContext } from "react";

export const NavbarDesktop = () => {
    const { user } = useContext(UserContext);
  return (
    <>
      <Nav className="me-auto">
        {/* Nav es el div problemático */}
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
        {/* <NavDropdown
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
        </NavDropdown> */}

        <Nav.Link href="/about">Novedades</Nav.Link>
        {/* <Nav.Link href="/info">Información</Nav.Link> */}
        <Nav.Link href="/contacto">Contacto</Nav.Link>
        <div className="iconosNavbar">
          {user !== null && user.role !== "admin" && (
            <CartWidget className="cartWidget" />
          )}

          <IconoLogin />
          {user !== null && user.role !== "user" && <NuevoProducto />}
        </div>
      </Nav>
    </>
  );
};
