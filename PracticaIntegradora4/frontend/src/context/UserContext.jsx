import { createContext, useState, useEffect } from "react";
import axios from "axios";

//creo el contexto
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  //no me sirve que por default sea {} porque ahí siempre va a existir usuario
  const [user, setUser] = useState(null);

  useEffect(() => {
    //no se usa async await en useEffect
    if (!user) {
      axios
        .get("http://localhost:8080/test")

        .then((res) => {
          // console.log(res.data.cart)
          setUser(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    // }else {
    //   setUser(user)
    }
  }, []);

  // async function getUser() {
  //   //get user 3
  //   let user = await axios.get("/users/65fb74c10ea84fa999406d53");

  //   const userFound = await user.json();
  //   console.log(userFound);
  // }

  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || [])
  // const [user, setUser] = useState(getUser())

  // let data = {
  //   user,
  //   setUser,
  // };

  return (
    //pongo a disposición el contexto con children
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
