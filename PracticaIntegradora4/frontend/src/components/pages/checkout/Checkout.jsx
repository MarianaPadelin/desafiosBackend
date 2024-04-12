import { Box, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import "./Checkout.css"

const Checkout = ({ nombreUsuario, userEmail, handleSubmit, handleChange, errors }) => {
  return (
    <div className="checkoutContainer">
      <Box
        className="textoPrincipal"
        component="section"
      >
        Para completar la compra, por favor asegúrese de que los datos son
        correctos e ingrese los datos que se piden a continuación:
      </Box>

      <Box className="datosUsuario">
        <h3>Nombre: {nombreUsuario}</h3>
        <h3>Email: {userEmail}</h3>
      </Box>

      <Box className="formularioEnvio" onSubmit={handleSubmit} component="form">
        <TextField
          label="Dirección"
          name="direccion"
          placeholder="Ingrese la dirección de envío"
          helperText={errors.direccion}
          error={errors.direccion ? true : false}
          onChange={handleChange}
        />
        <TextField
          label="Telefono"
          name="telefono"
          placeholder="Ingrese su teléfono"
          helperText={errors.telefono}
          error={errors.telefono ? true : false}
          onChange={handleChange}
        />
        <Button className="botonVolver" type="submit">
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default Checkout;
