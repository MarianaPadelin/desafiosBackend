import { ItemList } from "./ItemList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { database } from "../../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../../common/Loader";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { nombreCategoria } = useParams();
  const { nombreLinea } = useParams();

  const imagenes = [
    {
      id: "img1",
      url: "https://res.cloudinary.com/dvxkjikvk/image/upload/v1705414748/productos/c58a9ac4-01a3-4387-88ca-9f9ae6962acd_flpcon.jpg",
    },
    {
      id: "img2",
      url: "https://res.cloudinary.com/dvxkjikvk/image/upload/v1705415691/productos/WhatsApp_Image_2024-01-16_at_11.33.18_yng8kn.jpg",
    },
    {
      id: "img3",
      url: "https://res.cloudinary.com/dvxkjikvk/image/upload/v1705415888/productos/WhatsApp_Image_2024-01-16_at_11.33.14_l9b431.jpg",
    },
  ];

  useEffect(() => {
    async function getCollection() {
      let backendcolection = await fetch("http://localhost:8080/products", {
        method: "GET",
      });

      const data = await backendcolection.json();

      // console.log(data.docs);
      // data.map((elemento) => {
      //     return { id: elemento.id, ...elemento.data() };
      //   //   return { id: elemento.id, ...elemento.data() };
      // });
      return data.docs;
    }
    //  let coleccion = getCollection()
    // let coleccion = collection(database, "products");
    // let busqueda;
    // if (nombreCategoria) {
    //   busqueda = query(coleccion, where("category", "==", nombreCategoria));
    // } else if (nombreLinea) {
    //   busqueda = query(coleccion, where("linea", "==", nombreLinea));
    // } else {
    //   busqueda = coleccion;
    // }
    // busqueda = coleccion
    getCollection()
    //MANDAR BUSQUEDAS POR QUERY
      // getDocs(busqueda)
      .then((res) => {
        // console.log(res);
        let result = res.map((elemento) => {
          // return { id: elemento.id, ...elemento.data() ;
          return {
            id: elemento._id,
            title: elemento.title,
            stock: elemento.stock,
            description: elemento.description,
            price: elemento.price,
            img: elemento.thumbnails,
            category: elemento.category,
            //code, status, owner
          };
        });
        setItems(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nombreCategoria, nombreLinea]);

  return (
    <div>
      {items.length > 0 ? (
        <div>
          <ItemList imagenes={imagenes} items={items} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
