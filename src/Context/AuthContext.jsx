import { createContext, useContext, useEffect, useState } from "react";
//context
const AuthContext = createContext();

function AuthProvider({ children }) {
  //state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //useEffect
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  //logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };
  //provider
  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

//use context hook
export const useAuth = () => {
  return useContext(AuthContext);
};
