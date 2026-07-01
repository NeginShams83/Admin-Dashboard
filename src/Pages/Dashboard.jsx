import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
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
