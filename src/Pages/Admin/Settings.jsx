import { useState, useEffect } from "react";
import api from "../../api/api.js";
import EditForm from "../../Components/EditForm.jsx";
import Loading from "../../Components/Common/Loading.jsx";
import Alert from "../../Components/Common/Alert.jsx";
import { useTheme } from "../../Context/ThemeContext.jsx";

function Settings() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const themeContext = useTheme();
  const theme = themeContext?.theme || "dark";
  const toggleTheme = themeContext?.toggleTheme || (() => {});

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/users/profile");
      console.log("PROFILE DATA:", res.data);
      setProfile(res.data);
    } catch (err) {
      console.error("خطا در دریافت اطلاعات کاربر:", err);
      setError("دریافت اطلاعات کاربر با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    setSuccessMessage("اطلاعات پروفایل با موفقیت بروزرسانی شد.");

    fetchProfile();

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  if (loading) return <Loading />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div className="max-w-2xl mx-auto p-6  rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-3">
        تنظیمات حساب کاربری
      </h1>

      {successMessage && (
        <div className="mb-4">
          <Alert type="success" message={successMessage} />
        </div>
      )}

      {/* chnage theme */}
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            تم برنامه
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            حالت فعلی:{" "}
            <span className="font-bold">
              {theme === "dark" ? "تاریک (Dark)" : "روشن (Light)"}
            </span>
          </p>
        </div>

        <button
          onClick={toggleTheme}
          type="button"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          تغییر به {theme === "dark" ? "Light ☀️" : "Dark 🌙"}
        </button>
      </div>

      {/* edit users profile */}
      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400">نام:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {profile?.firstname || profile?.firstName || "ثبت نشده"}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400">
              نام کاربری:
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              {profile?.username || "ثبت نشده"}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400">نقش:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {profile?.role === "admin" ? "مدیر سیستم" : "کاربر عادی"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ویرایش مشخصات
          </button>
        </div>
      ) : (
        <EditForm
          profile={profile}
          onCancel={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Settings;
