import { createContext, useEffect, useState } from "react";
import { getUser } from "../../api/user";
// import { getUser } from "../../api/users";

// Create the context
export const AuthContext = createContext();

// Create our Provider (warpper component)
const AuthProvider = ({ children }) => {
  // Where we want to store our token
  // const [token, setToken] = useState(localStorage.getItem("token"));
  // const [token, setToken] = useState("");
  // User related data (username, etc)
  const [user, setUser] = useState({});
  // If the users token is set and authenticated
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get user data everytime token is updated
  useEffect(() => {
    async function getMe() {
      const res = await getUser();
      if (res.status === 200) {
        setUser(res.data);
        setIsLoggedIn(true);
      }
    }
    getMe();
  }, [isLoggedIn]);

  // For storing multiple values
  const contextValue = {
    // token,
    // setToken,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };
  // Passing child components into wrapper
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
