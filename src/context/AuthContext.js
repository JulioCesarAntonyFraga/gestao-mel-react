import { createContext, useEffect, useState } from "react";
import axios from "axios";
import app from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try{
      var response = await axios.post(process.env.REACT_APP_API_BASE_URL + `/auth/login?email=${email}&password=${password}`);
      console.log(response.data.token);
      await localStorage.setItem("token", response.data.token);
      await localStorage.setItem("refreshToken", response.data.refreshToken);
      await localStorage.setItem("user", JSON.stringify(response.data.user));
      setToken(response.data.token)
      setIsAuthenticated(true);
      localStorage.setItem('selectedItem', 1);
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    }
    catch(error){
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      console.log(error);
      return error;
    }
  };

  const logout = async () => {
    await localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
