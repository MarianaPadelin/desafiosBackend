import * as React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Carrito.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { Box, CardContent, Chip, IconButton, Paper, TextField, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const Carrito = ({ cart, eliminarElemento, preguntaLimpiar, darPrecioTotal, handleSubmit, handleChange, totalEnvio, precioFinal}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }} className="bodyCarrito">
      <div>
        {cart.map((producto) => {
          return (
            <div key={producto.id}>
              <Paper elevation={10}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "lightgray",
                    marginTop: "3vw",
                    marginBottom: "2vw",
                    borderRadius: "4px",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={producto.img} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={producto.title}
                      secondary={
                        <React.Fragment>
                          {producto.description}
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            — ${producto.price}
                          </Typography>
                          <br></br>
                          Cantidad:
                          {producto.quantity}
                        </React.Fragment>
                      }
                    />

                    <Tooltip title="Eliminar" className="tacho">
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: "¿Eliminar este producto?",
                            icon: "warning",
                            showCancelButton: true,
                            background: "lightGrey",
                            confirmButtonColor: "cadetBlue",
                            cancelButtonColor: "lightCoral",
                            confirmButtonText: "Eliminar",
                            cancelButtonText: "Cancelar",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              eliminarElemento(producto.id);
                              Swal.fire({
                                title: "Listo",
                                text: "Se eliminó el producto",
                                icon: "success",
                                background: "lightGrey",
                                confirmButtonColor: "cadetBlue",
                              });
                            }
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              </Paper>
            </div>
          );
        })}

        <Button className="botonVolver" onClick={preguntaLimpiar}>
          Limpiar Carrito
        </Button>
        <Link to="/">
          <Button className="botonVolver">Volver</Button>
        </Link>
      </div>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 300,
            height: 530,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            padding: "5px",
            margin: "3vw",
          },
        }}
      >
        <Paper elevation={10}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                RESUMEN DE COMPRA
              </Typography>
              <Divider>
                <Chip label="ITEMS" />
              </Divider>
              <Typography variant="h5" component="div">
                El precio de los productos es ${darPrecioTotal}
              </Typography>
              <br></br>
              <form onSubmit={handleSubmit} color="text.secondary">
                <Typography>INSERTE CÓDIGO DE DESCUENTO</Typography>

                <TextField onChange={handleChange} name="codigo"></TextField>
                <Button className="botonComprar" size="sm" type="submit">
                  Aplicar código
                </Button>
              </form>
              <br />
              <Typography variant="body2">
                El valor aproximado del envío es de ${totalEnvio}
              </Typography>
              <Divider>
                <Chip label="TOTAL" />
              </Divider>
              <Typography variant="h5" align="center">
                Precio final: ${precioFinal}
              </Typography>
            </CardContent>
          </Card>

          <Link to="/Checkout">
            <Button style={{ marginLeft: 5 }} className="botonVolver">
              Finalizar compra
            </Button>
          </Link>
        </Paper>
      </Box>
    </div>
  );
};

export default Carrito;
