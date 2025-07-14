import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext();
const AuthProvider=({children})=>{
const [token,setToken]=useState(null);
const[user,setUser]=useState(null);

useEffect(()=>{
        const storedUser=localStorage.getItem('user')
        const storedToken=localStorage.getItem('token');

        if(storedUser && storedToken){
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
},[])


const logOut=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
}

    return <AuthContext.Provider value={{ user, token, logOut }}>{children}</AuthContext.Provider>
}
export default AuthProvider;