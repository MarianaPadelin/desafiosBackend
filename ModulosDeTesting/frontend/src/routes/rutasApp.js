// import { SearchBarContainer } from "../components/layouts/navbar/search/SearchBarContainer";
import { ItemListContainer } from "../components/pages/ItemList/ItemListContainer"
import CarritoContainer from "../components/pages/carrito/CarritoContainer";
import CheckoutContainer from "../components/pages/checkout/CheckoutContainer";
// import { ContactoContainer } from "../components/pages/contacto/ContactoContainer"
import { FirebaseAuth } from "../components/pages/firebaseAuth/FirebaseAuth";
import { FormularioNuevoProductoContainer } from "../components/pages/formularioNuevoProducto/FormularioNuevoProductoContainer";
import ItemDetailContainer from "../components/pages/itemDetail/ItemDetailContainer";
import LoginContainer from "../components/pages/login/LoginContainer"
import ProfileContainer from "../components/pages/profile/ProfileContainer";
import RegisterContainer from "../components/pages/register/RegisterContainer";


export const rutasApp = [
  {
    id: "home",
    path: "/",
    Element: ItemListContainer,
  },
  {
    id: "categorias",
    path: "/Categorias/:nombreCategoria",
    Element: ItemListContainer,
  },
  {
    id: "lineas",
    path: "/Linea/:nombreLinea",
    Element: ItemListContainer,
  },
  {
    id: "detalle",
    path: "/DetalleProducto/:id",
    Element: ItemDetailContainer,
    auth: "premium",
  },
  {
    id: "carrito",
    path: "/Carrito",
    Element: CarritoContainer,
  },
  {
    id: "checkout",
    // id: "login",
    path: "/Checkout",
    Element: CheckoutContainer,
  },
  // {
  //   id: "contacto",
  //   path: "/contacto",
  //   Element: ContactoContainer,
  // },
  // {
  //   id: "search",
  //   path: "/Searchbar",
  //   Element: SearchBarContainer,
  // },
  {
    id: "nuevo",
    path: "/NuevoProducto",
    Element: FormularioNuevoProductoContainer,
  },
  {
    id: "login",
    path: "/Login",
    Element: LoginContainer,
  },
  {
    id: "register",
    path: "/Register",
    Element: RegisterContainer,
  },
  {
    id: "profile",
    path: "/Profile",
    Element: ProfileContainer,
  },
  {
    id: "firebase-auth",
    path: "/firebase-auth",
    Element: FirebaseAuth,
  },
];

