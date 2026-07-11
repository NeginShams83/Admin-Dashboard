import { useState, useEffect } from "react";
import api from "../api/api.js";
import Loading from "../Components/Common/Loading.jsx";

function Profile() {
  //states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //get
        const res = await api.get("/users");
        //check data
        setUsers(res?.data?.data?.users ?? []);
      } catch (err) {
        console.error("error in get users", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  //load
  if (loading) {
    return <Loading />;
  }
  //error
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md mx-auto my-4 text-center border border-red-200">
        <p className="font-semibold">❌ خطا: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto  p-6  bg-gray-50/20 rounded-xl shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold  flex items-center gap-2">
          <span>👤</span> پروفایل کاربری
        </h2>
        <span className="bg-blue-100  text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {users.length} کاربر فعال
        </span>
      </div>

      <h3 className="text-lg font-medium  mb-4">لیست کاربران سیستم:</h3>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          هیچ کاربری در سیستم یافت نشد.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white/30 p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center space-x-4 space-x-reverse"
            >
              <div className="bg-gradient-to-tr from-blue-500 to-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                {user.firstname ? user.firstname[0].toUpperCase() : "U"}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.firstname}
                </p>
                <p className="text-xs text-gray-900 truncate mt-1">
                  @{user.username}
                </p>
              </div>
              <span className="text-xs mr-2 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                {user.role}
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
