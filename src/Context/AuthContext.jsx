import { createContext, useContext, useEffect, useState } from "react";
//context
const AuthContext = createContext();

function AuthProvider({ children }) {
  //state
  const [user, setUser] = useState(null);
  //useEffect
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //provider
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

//use context hook
export const useAuth = () => {
  return useContext(AuthContext);
};
