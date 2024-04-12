// import { useFormik } from "formik";
import { Box, TextField } from "@mui/material";
// import SearchBar from "./SearchBar";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { database } from "../../../../firebaseConfig";
import { useParams } from "react-router-dom";




export const SearchBarContainer = () => {

  const [userData, setUserData] = useState({
    searchbar: "",
  });
  const { nombreCategoria } = useParams();
  const { nombreLinea } = useParams();


  const handleChange = (evento) => {
     setUserData({ ...userData, [evento.target.name]: evento.target.value });
   };

  const handleSubmit = (evento) => {
    evento.preventDefault();

  
    let data = userData.searchbar;
      if (data == nombreCategoria || data == nombreLinea){
        console.log("funciona")
        //useNavigate("/Categorias/{nombreCategoria}")
    
      }else {
        console.log("no funciona")
      }
    };

   

  //     useEffect(() => {
  //           let coleccion = collection(database, "products");
  //           let busqueda;
  //           if (nombreCategoria) {
  //             busqueda = query(
  //               coleccion,
  //               where("category", "==", nombreCategoria)
  //             );
  //           } else if (nombreLinea) {
  //             busqueda = query(coleccion, where("linea", "==", nombreLinea));
  //           } else {
  //             busqueda = coleccion;
  //           }

  //           getDocs(busqueda)
  //             .then((res) => {
  //               let products = res.docs.map((elemento) => {
  //                 return { id: elemento.id, ...elemento.data() };
  //               });
  //               setUserData(products);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         }, [nombreCategoria, nombreLinea]);

 


// export const SearchBarContainer = () => {
//       const { handleSubmit, handleChange } = useFormik({
//         initialValues: {
//           searchbar: "",
//         },

//         onSubmit: (datosEnviados) => {
//           console.log(datosEnviados);
//           console.log("hola")
//           // useNavigate(/)
//         },
//       });

  return (
    <Box onSubmit={handleSubmit} component="form" className="d-flex">
      <TextField
        className="search"
        placeholder="Buscar producto"
        onChange={handleChange}
        name="searchbar"
        variant="outlined"
        size="small"
        style={{
          backgroundColor: "transparent",
          paddingInline: "1vw",
        }}
      ></TextField>
      <Button variant="outline-dark" type="submit">
        Buscar
      </Button>
    </Box>
    // <SearchBar handleSubmit={handleSubmit} handleChange={handleChange} />
  );
};
