import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth.js";

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
      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold px-3.5 py-2.5 rounded-xl transition-all shadow-sm"
      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-200 px-3.5 py-2.5 rounded-xl transition-all";

  return (
    <div className="bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-200 dir-rtl">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-neutral-800 border-l border-neutral-200 dark:border-neutral-700/70 p-5 flex flex-col justify-between transition-colors duration-200 shrink-0">
          <div>
            {/* Welcome message */}
            <div className="mb-6 p-3 bg-neutral-100/70 dark:bg-neutral-900/50 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                خوش آمدید،
              </p>
              <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate mt-0.5">
                {user?.username || "مدیر سیستم"}
              </p>
            </div>

            <h1 className="text-xl font-bold mb-5 px-1 text-neutral-900 dark:text-neutral-50">
              داشبورد مدیریتی
            </h1>

            <nav className="flex flex-col gap-1.5 text-sm">
              <NavLink to="home" className={getNavLinkClass}>
                خانه
              </NavLink>

              <NavLink to="profile" className={getNavLinkClass}>
                پروفایل
              </NavLink>

              <NavLink to="users" className={getNavLinkClass}>
                کاربران
              </NavLink>
              <NavLink to="products" className={getNavLinkClass}>
                محصولات
              </NavLink>

              <NavLink to="categories" className={getNavLinkClass}>
                دسته‌بندی‌ها
              </NavLink>

              <NavLink to="subCategories" className={getNavLinkClass}>
                زیر دسته‌ها
              </NavLink>

              <NavLink to="settings" className={getNavLinkClass}>
                تنظیمات
              </NavLink>

              <NavLink to="favorites" className={getNavLinkClass}>
                علاقه‌مندی‌ها
              </NavLink>
            </nav>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 transition-all font-semibold text-sm flex items-center justify-center gap-2"
          >
            خروج از حساب
          </button>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
