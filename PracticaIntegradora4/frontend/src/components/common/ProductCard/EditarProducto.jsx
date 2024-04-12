import { IconButton } from "@mui/material";
// import Swal from "sweetalert2";
// import { doc, deleteDoc } from "firebase/firestore";
// import { database } from "../../../firebaseConfig";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
export const EditarProducto = ({ id }) => {
  const navigate = useNavigate()

  return (
    <div>
      <IconButton
        onClick={() => {
         navigate(`editProduct/${id}`);
        }}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
};
