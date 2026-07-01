import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const { theme } = useTheme();

  //change color for theme
  const layoutStyle = {
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#333333",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };

  return (
    <div style={layoutStyle}>
      <div className="flex min-h-screen">
        {/* sidebar */}
        <aside className="w-60 border-r-2 border-sky-950 p-5">
          <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

          <nav className="flex flex-col gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-700 text-white p-2 rounded-lg"
                  : " hover:bg-blue-400  p-2 rounded-lg"
              }
              to={"profile"}
            >
              Profile
            </NavLink>
            <NavLink
              to={"settings"}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-700 text-white p-2 rounded-lg"
                  : " hover:bg-blue-400  p-2 rounded-lg"
              }
            >
              Setting
            </NavLink>
            <NavLink
              to={"favorites"}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-700 text-white p-2 rounded-lg"
                  : " hover:bg-blue-400 p-2 rounded-lg"
              }
            >
              Favorite
            </NavLink>
          </nav>
        </aside>

        {/* content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
