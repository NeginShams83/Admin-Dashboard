import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
function Dashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  console.log(user);

  //change color for theme
  const layoutStyle = {
    backgroundColor: theme === "dark" ? "#111B2D" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };
  //welcome message
  const welcomeMessage = user ? (
    <p>Welcome {user.username}</p>
  ) : (
    <Navigate to="/login" />
  );

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
          {welcomeMessage}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
