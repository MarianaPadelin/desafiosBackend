import { IconButton } from "@mui/material";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

export const QuitarProducto = ({ id }) => {
    let identificacion = id;

    const quitarProducto = () => {
         deleteDoc(doc(database, "products",identificacion ));
      
    };
    
  return (
    <div>
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
             quitarProducto()
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
    </div>
  );
};
