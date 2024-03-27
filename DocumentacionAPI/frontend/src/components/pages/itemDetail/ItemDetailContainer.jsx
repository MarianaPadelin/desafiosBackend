import { useState, useEffect, useContext } from "react"
import {ItemDetail} from "./ItemDetail"
import {useParams} from "react-router-dom"
// import { database } from "../../../firebaseConfig"
// import {collection, getDoc, doc} from "firebase/firestore"
import Loader from "../../common/Loader"
import { CartContext } from "../../../context/CartContext"
import Swal from "sweetalert2"



const ItemDetailContainer = () => {
      const[seleccionado, setSeleccionado] = useState({})

      const { id } = useParams();

      const { agregarProductos, cantidad } = useContext(CartContext)
      const cantidadDeProductos = cantidad(id)

      const onAdd = (cantidad) => {
          let data = {
            ...seleccionado,
            quantity: cantidad,
          };

          agregarProductos(data)
       const Toast = Swal.mixin({
         toast: true,
         position: "center",
         showConfirmButton: false,
         timer: 2000,
         timerProgressBar: true,

         color: "cadetBlue",
         didOpen: (toast) => {
           toast.addEventListener("mouseenter", Swal.stopTimer);
           toast.addEventListener("mouseleave", Swal.resumeTimer);
         },
       });

       Toast.fire({
         icon: "success",
         title: "El producto se agregó al carrito",
       });
          
        };

      useEffect(() => {
        async function getCollection(id){
          let backendcolection = await fetch(
            `http://localhost:8080/products/${id}`,
            {
              method: "GET",
            }
          );
           const data = await backendcolection.json();
           console.log(data.product)
           return data.product
        }
        // let coleccion = collection(database, "products")
        getCollection(id)
        // console.log(refDoc)
        // let refDoc = doc(coleccion, id)
        // getDoc(refDoc)
        
        .then((elemento) => {
          //si hay un array en thumbnails, img = [0], img2 = [1]
          setSeleccionado({ id: elemento._id,  img: elemento.thumbnails, ...elemento })}).catch((err)=>{console.log(err)})



      }, [id]);


        return (
          <div>
            {seleccionado.id ? (<ItemDetail seleccionado={seleccionado} agregarProductos={agregarProductos} cantidadDeProductos={cantidadDeProductos} onAdd={onAdd}/>) : (<Loader />) }
          </div>
          
        )

      
      }



export default ItemDetailContainer