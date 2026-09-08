const UserCard = ({ user }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700/70 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3.5 dir-rtl">
      {/* User avatar */}
      <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
        {user?.firstname ? user.firstname[0].toUpperCase() : "U"}
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0 text-right">
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
          {user?.firstname || user?.firstName || "کاربر بدون نام"}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 dir-ltr text-right">
          @{user?.username || "username"}
        </p>
      </div>

      {/* Role and status */}
      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
            user?.role === "admin"
              ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50"
              : "bg-neutral-100 dark:bg-neutral-700/60 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600/50"
          }`}
        >
          {user?.role === "admin" ? "ادمین" : "کاربر"}
        </span>

        {/* Online indicator */}
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
      </div>
    </div>
  );
};

export default UserCard;
