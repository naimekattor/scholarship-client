import { signInWithPopup, signOut, GoogleAuthProvider, } from 'firebase/auth';
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const api = axios.create({ baseURL: "https://scholarship-server-t1ko.onrender.com/api" });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle login
  const loginUser = (email, password) => {
    setLoading(true);
    return api.post("/auth/login", { email, password }).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setLoading(false);
      return res.data;
    });
  };

  // Function to handle register
  const registerUser = (name, email, password) => {
    setLoading(true);
    return api.post("/auth/register", { name, email, password }).then((res) => {
      setLoading(false);
      return res.data;
    });
  };

  const backendGoogleLogin = (googleUser) => {
    return api.post("/auth/google", {
      name: googleUser.displayName,
      email: googleUser.email,
    }).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setLoading(false);
      return res.data;
    });
  };

  // sign in with google
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  }

  // Function to handle logout
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    return signOut(auth).then(() => {
      // console.log('signout successful');

    }).catch((error) => {
      // console.log(error);

    });
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
    setUser,
    loading,
    loginUser,
    registerUser,
    logOut,
    googleSignIn,
    backendGoogleLogin
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
