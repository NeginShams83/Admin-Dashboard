const UserCard = (user) => {
  console.log(user);
  return (
    <>
      <div className="bg-white/30 p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center space-x-4 space-x-reverse">
        <div className="bg-gradient-to-tr from-blue-500 to-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
          {user?.firstname ? user.firstname[0].toUpperCase() : "User"}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {user?.firstname ?? "User"}
          </p>
          <p className="text-xs text-gray-900 truncate mt-1">
            @{user?.username ?? "User"}
          </p>
        </div>
        <span className="text-xs mr-2 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
          {user?.role ?? "User"}
        </span>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
      </div>
    </>
  );
};

export default UserCard;
