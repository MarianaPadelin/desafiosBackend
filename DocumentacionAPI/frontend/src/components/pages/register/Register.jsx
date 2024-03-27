import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import "./Register.css"

const Register = ({ handleSubmit, handleChange, errors }) => {
  return (
    <div className="divFormulario">
      <form className="camposFormulario" onSubmit={handleSubmit}>
        <TextField
          placeholder="Nombre"
          label="Nombre"
          name="nombre"
          variant="outlined"
          error={errors.nombre ? true : false}
          helperText={errors.nombre}
          onChange={handleChange}
        />
        <TextField
          placeholder="Apellido"
          label="Apellido"
          name="apellido"
          variant="outlined"
          error={errors.apellido ? true : false}
          helperText={errors.apellido}
          onChange={handleChange}
        />
        <TextField
          placeholder="Edad"
          label="Edad"
          name="edad"
          variant="outlined"
          error={errors.edad ? true : false}
          helperText={errors.edad}
          onChange={handleChange}
        />
        <TextField
          type="email"
          placeholder="Email"
          label="Email"
          name="email"
          variant="outlined"
          error={errors.email ? true : false}
          helperText={errors.email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label="Contraseña"
          placeholder="Contraseña"
          name="contraseña"
          variant="outlined"
          error={errors.contraseña ? true : false}
          helperText={errors.contraseña}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="dark"
          size="lg"
          className="botonVolver"
          style={{ marginLeft: 0}}
        >
          Registrarse
        </Button>
      </form>
    </div>
  );
};

export default Register;
