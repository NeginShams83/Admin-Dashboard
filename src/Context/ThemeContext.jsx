import { createContext, useEffect, useState, useContext } from "react";

// 1. createContext
const ThemeContext = createContext();
// 2. Provider
export function ThemeProvider({ children }) {
  //state for theme by default is dark from local storage

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  //function to toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. useContext
// custom hook to use theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
