import { IconButton } from "@mui/material";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
// import { doc, deleteDoc } from "firebase/firestore";
// import { database } from "../../../firebaseConfig";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const QuitarProducto = ({ id }) => {
  const navigate = useNavigate()


    const quitarProducto = () => {
      console.log(id)
      axios.delete(`/api/products/${id}`)
      .then(() => navigate("/"))

        //  deleteDoc(doc(database, "products",identificacion ));
      
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
