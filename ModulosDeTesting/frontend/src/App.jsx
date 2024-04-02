import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layouts from "./components/layouts/Layouts.jsx";
import Error from "./components/pages/error/Error.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { rutasApp } from "./routes/rutasApp.js";
import "./App.css"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <UserContextProvider>
          <CartContextProvider>
            <Routes>
              <Route element={<Layouts />}>
                {rutasApp.map(({ id, path, Element }) => (
                  <Route key={id} path={path} element={<Element />} />
                ))}
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
          </CartContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
