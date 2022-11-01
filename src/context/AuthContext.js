import { useEffect } from "react";
import { createContext, useState} from "react";
import {onAuthStateChanged} from "firebase/auth"
import { auth } from "../firebase";

export const AuthContext = createContext()

export  const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    
    useEffect( () => {
   onAuthStateChanged(auth, (user) => { 
            setCurrentUser(user)
           })
    
        }, []);

   return ( <AuthContext.Provider
        value = {{currentUser}}
        >{children}
         </AuthContext.Provider>)

}