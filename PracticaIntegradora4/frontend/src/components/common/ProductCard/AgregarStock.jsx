import { Button } from "react-bootstrap";
// import { doc, increment, updateDoc } from "firebase/firestore";
// import { database } from "../../../firebaseConfig";
import axios from "axios";

export const AgregarStock = ({ id }) => {
  const agregarStock = async () => {
    // axios.put(`/api/products/${id}`),
    // {headers: {
    //       "Content-Type": "application/json",
    //     },
    //   body: JSON.stringify({
    //       stock: 3

    //     })
    //   }
    // }

    await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         stock: 5
        }),
      });
      }

    //id de req params
    //datos producto de req.body
    //devuelve ele producto modificado, status 201 si es admin, 200 si es premium

    // updateDoc(doc(database, "products", identificacion), {
    //   stock:  increment(1),
    // });

  // };

  const quitarStock = async () => {
    axios.put(`/api/products/${id}`),
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: 2,
        }),
      };
  };

  // const quitarStock = () => {

  //   updateDoc(doc(database, "products", identificacion), {
  //     stock: increment(-1),
  //   });

  // };


  return (
    <div className="botonesStock">
      <Button className="botonComprar" onClick={agregarStock}>
        +
      </Button>
      <Button className="botonComprar" onClick={quitarStock}>
        -
      </Button>
    </div>
  );
};
