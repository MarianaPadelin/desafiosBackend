import { createContext, useState, useEffect } from "react";
// import axios from "axios";

//creo el contexto
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  useEffect(()=> {
    //no se usa async await en useEffect
    if(!user){
      fetch("http://localhost:8080/test", {
        method: "GET",
        credentials: "include", 
      })
      .then(({data}) => {
        console.log("data " + data)
        setUser(data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [user])

  // async function getUser() {
  //   //get user 3
  //   let user = await axios.get("/users/65fb74c10ea84fa999406d53");

  //   const userFound = await user.json();
  //   console.log(userFound);
  // }

  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || [])
  // const [user, setUser] = useState(getUser())

  let data = {
    user,
    setUser,
  };

  return (
    //pongo a disposición el contexto con children
    <UserContext.Provider value={{data}}> {children}</UserContext.Provider>
  );
}




