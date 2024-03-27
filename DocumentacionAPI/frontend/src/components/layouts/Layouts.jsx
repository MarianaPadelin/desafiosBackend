import { Outlet } from "react-router-dom";
import { Navegacion } from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { Paper } from "@mui/material";
// import { Divider } from "@mui/material";

const Layouts = () => {
  return (
    <>
      <Paper elevation={10}>
        <Navegacion />
      </Paper>

      <Outlet />

      <Footer />
    </>
  );
};

export default Layouts;
