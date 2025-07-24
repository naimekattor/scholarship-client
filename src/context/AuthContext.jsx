import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
const api = axios.create({ baseURL: "http://localhost:5000/api" });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle login
  const loginUser = (email, password) => {
    setLoading(true);
    return api.post("/auth/login", { email, password }).then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        setLoading(false);
        return res.data;
    });
  };

  // Function to handle register
  const registerUser = (name, email, password) => {
     setLoading(true);
     return api.post("/auth/register", { name, email, password }).then(res => {
        setLoading(false);
        return res.data;
     });
  };

  // Function to handle logout
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  };

  // Observer for user state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const authInfo = {
    user,
    loading,
    loginUser,
    registerUser,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;