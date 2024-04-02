import { Box, TextField, Typography } from "@mui/material";
import { Button } from "react-bootstrap";

const Checkout = ({ handleSubmit, handleChange, errors }) => {
  return (
    <div>

        <Typography
          sx={{ p: 2, border: "1px dashed grey", margin: "3vw", padding:0 }}
          variant="h4"
        >
          Para completar la compra, por favor ingrese los datos que se piden a
          continuación:
        </Typography>

      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "25ch",
            margin: "3vw",
            display: "flex",
            alignContent: "center",
            background: "lightgrey",
          },
        }}
      >
        <TextField
          label="Nombre"
          name="nombre"
          placeholder="Ingrese su nombre"
          helperText={errors.nombre}
          error={errors.nombre ? true : false}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          placeholder="Ingrese su email"
          helperText={errors.email}
          error={errors.email ? true : false}
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
