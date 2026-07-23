import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // const { theme } = useTheme();
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  //welcome message
  const welcomeMessage = (
    <p className="m-4 text-center font-extralight">Welcome {user.username}</p>
  );

  //handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
      <div className="flex min-h-screen">
        <aside className="w-60 border-r-2 border-sky-950 p-5">
          {/* sidebar */}
          {welcomeMessage}
          <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

          <nav className="flex flex-col gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-700 text-white p-2 rounded-lg"
                  : " hover:bg-blue-400  p-2 rounded-lg"
              }
              to={"Home"}
            >
              Home
            </NavLink>
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
          <button
            onClick={handleLogout}
            className="px-4 py-1 mt-5 rounded-lg bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
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
