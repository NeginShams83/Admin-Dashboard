import { createContext, useEffect, useState } from "react";

// 1. Create Context
const ThemeContext = createContext();

// 2. Define Provider
export function ThemeProvider({ children }) {
  // Retrieve initial theme from localStorage (default: "dark")
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Toggle 'dark' class on <html> element for Tailwind CSS dark mode compatibility
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Function to toggle between themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook useTheme (with usage validation)
export { ThemeContext };
