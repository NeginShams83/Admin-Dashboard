import { useTheme } from "../context/ThemeContext";

function Settings() {
  //get theme from context
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h2>تنظیمات تم: {theme}</h2>
      <button
        className={`${theme === "dark" ? "bg-blue-950 text-white" : "bg-blue-400 text-white"} px-4 py-1 rounded-lg`}
        onClick={toggleTheme}
      >
        change theme
      </button>
    </div>
  );
}
export default Settings;
