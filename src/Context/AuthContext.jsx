import { createContext, useState } from "react";

//context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("خطا در خواندن اطلاعات کاربر از localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  //logoutfunc
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export { AuthContext };
