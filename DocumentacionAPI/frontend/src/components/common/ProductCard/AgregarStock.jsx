import { Button } from "react-bootstrap";
import { doc, increment, updateDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

export const AgregarStock = ({ id }) => {
  let identificacion = id;

  const agregarStock = () => {

    updateDoc(doc(database, "products", identificacion), {
      stock:  increment(1),
    });

  };

  const quitarStock = () => {

    updateDoc(doc(database, "products", identificacion), {
      stock: increment(-1),
    });

  };


//ESTO NO VA ---
  // const rellenar = () => {
  //     let products
  //     //en products poner un formulario con los campos a rellenar
  //     let coleccion = collection(database,"products")
  //     products.forEach((elemento) => {

  //         addDoc(coleccion, elemento)
  //       // stock+1
  //     })
  //     //const actualizar
  //     //const eliminar
  // }
  return (
    <div>
      <Button className="botonComprar" onClick={agregarStock}>
        +
      </Button>
      <Button className="botonComprar" onClick={quitarStock}>
        -
      </Button>
    </div>
  );
};
