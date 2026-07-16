import { useState, useEffect } from "react";
import api from "../api/api.js";
import Loading from "../Components/Common/Loading.jsx";
import UserCard from "../Components/UserCard.jsx";
import Alert from "../Components/Common/Alert.jsx";
import Empty from "../Components/Common/Empty.jsx";

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
    return <Alert type="error" message={error} />;
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
        //empty state
        <Empty title="هیچ کاربری در سیستم یافت نشد" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard key={user?._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
