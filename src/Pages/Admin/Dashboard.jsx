import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Active link styling helper
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "bg-blue-700 text-white p-2 rounded-lg transition-colors"
      : "hover:bg-blue-400 text-gray-700 dark:text-gray-200 p-2 rounded-lg transition-colors";

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-60 border-r-2 border-sky-950 p-5 flex flex-col justify-between">
          <div>
            {/* Welcome message */}
            <p className="m-4 text-center font-extralight text-sm">
              Welcome{" "}
              <span className="font-semibold">{user?.username || "Admin"}</span>
            </p>

            <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

            <nav className="flex flex-col gap-3">
              <NavLink to="home" className={getNavLinkClass}>
                Home
              </NavLink>

              <NavLink to="profile" className={getNavLinkClass}>
                Profile
              </NavLink>

              <NavLink to="users" className={getNavLinkClass}>
                Users
              </NavLink>

              <NavLink to="settings" className={getNavLinkClass}>
                Settings
              </NavLink>

              <NavLink to="favorites" className={getNavLinkClass}>
                Favorites
              </NavLink>
            </nav>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Logout
          </button>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
