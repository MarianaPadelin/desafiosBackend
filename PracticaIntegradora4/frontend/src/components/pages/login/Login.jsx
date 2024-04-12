import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = ({ handleSubmit, handleChange, errors, ingresarConGithub }) => {
  return (
    <div className="camposFormulario">
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="usuario"
          label="usuario"
          name="usuario"
          variant="outlined"
          error={errors.usuario ? true : false}
          helperText={errors.usuario}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label="contraseña"
          placeholder="contraseña"
          name="contraseña"
          variant="outlined"
          error={errors.contraseña ? true : false}
          helperText={errors.contraseña}
          onChange={handleChange}
        />
        <Button type="submit" variant="dark" size="lg" className="botonVolver">
          Ingresar
        </Button>
      </form>
      <p className="divGithub">
        <img
          className="logoGithub"
          src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1705701963/productos/github_logo_bv2o8w.png"
        />
        <Button className="botonVolver" onClick={() => {ingresarConGithub()

        }}>Ingresar con Github</Button>
      </p>

      {/* /api/jwt/github */}

      <p className="registrarse">
        ¿Todavía no tenés una cuenta?
        <Link to="/Register">
          <Button className="botonVolver">Registrarse</Button>
        </Link>
      </p>
    </div>
  );
};

export default Login;
