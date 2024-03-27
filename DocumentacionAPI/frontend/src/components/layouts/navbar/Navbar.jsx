import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavbarDesktop } from "./NavbarDesktop.jsx";
import "./Navbar.css";

import { useState } from "react";
import { Link } from "react-router-dom";


export function Navegacion() {
    const [showNavbar, setShowNavbar] = useState(false);

    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar);
    };
  return (
    <Navbar collapseOnSelect expand="md" className="Navbar">
      <Container className="Container">
        <Container className="logoYCarrito">
          <Link to="/" className="link" title="Home">
            <Navbar.Brand>
              <img
                src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1687124707/productos/WhatsApp_Image_2023-06-17_at_15.02.16_gch9zx.jpg"
                width="100"
                className="logoNavbar"
                alt="Logo"
              />
            </Navbar.Brand>
          </Link>
        </Container>

        <div className="menu-icon" onClick={handleShowNavbar}></div>
        <Container className="Container2">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <NavbarDesktop />

              

          </Navbar.Collapse>
        </Container>
      </Container>
    </Navbar>
  );
}



// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { CartWidget } from "./CartWidget.jsx";
// import Image from "react-bootstrap/Image";
// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import { categorias } from "../../../routes/categorias.js";
// import { lineas } from "../../../routes/lineas.js";
// // import { SearchBarContainer } from "./search/SearchBarContainer.jsx";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";
// // import { NuevoProducto } from "./NuevoProducto.jsx";

// export const Navegacion = () => {
//   const [showNavbar, setShowNavbar] = useState(false);

//   const handleShowNavbar = () => {
//     setShowNavbar(!showNavbar);
//   };
//   return (
//     <Navbar
//       expand="lg"
//       style={{ display: "flex" }}
//       id="myTopnav"
//       className="navbar"
//     >
//       <Container style={{ display: "flex" }}>
//         <Link to="/" className="link" title="Home">
//           <Navbar.Brand>
//             <Image
//               src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1687124707/productos/WhatsApp_Image_2023-06-17_at_15.02.16_gch9zx.jpg"
//               width="60"
//               className="d-inline-block align-top"
//               alt="Logo"
//               roundedCircle
//             />
//           </Navbar.Brand>
//         </Link>
//         <Link to="/" title="Home">
//           <Navbar.Brand id="titulo">MGGM</Navbar.Brand>
//         </Link>
//         <CartWidget />

//         {/* <NuevoProducto /> */}

//         <div className="menu-icon" onClick={handleShowNavbar}>
//           <MenuIcon />
//         </div>

//         <Container className={`nav-elements  ${showNavbar && "active"}`}>
//           <NavDropdown
//             style={{ paddingInline: "1vw" }}
//             menuVariant="dark"
//             title="Productos"
//             id="basic-nav-dropdown"
//           >
//             {categorias.map(({ id, path, title }) => (
//               <Link className="dropdown-item" key={id} to={path}>
//                 {title}
//               </Link>
//             ))}
//           </NavDropdown>
//           <NavDropdown
//             style={{ paddingInline: "1vw" }}
//             menuVariant="dark"
//             title="Líneas"
//             id="basic-nav-dropdown"
//           >
//             {lineas.map(({ id, path, title }) => (
//               <Link className="dropdown-item" key={id} to={path}>
//                 {title}
//               </Link>
//             ))}
//           </NavDropdown>
//           <NavDropdown
//             style={{ paddingInline: "1vw" }}
//             menuVariant="dark"
//             title="Explorá"
//           >
//             <NavDropdown.Item>Novedades</NavDropdown.Item>
//             <NavDropdown.Item>Promociones</NavDropdown.Item>
//             <NavDropdown.Item>Contactanos</NavDropdown.Item>
//             <NavDropdown.Divider style={{ backgroundColor: "CadetBlue" }} />
//             <NavDropdown.Item
//               href="https://www.instagram.com/mggmceramica/"
//               target="_blank"
//             >
//               Visitá nuestro instagram
//             </NavDropdown.Item>
//           </NavDropdown>

//           {/* <SearchBarContainer /> */}
//         </Container>
//       </Container>
//     </Navbar>
//   );
// };
