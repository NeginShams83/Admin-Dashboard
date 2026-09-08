import { useState, useEffect } from "react";
import api from "../../api/api.js";
import EditForm from "../../Components/EditForm.jsx";
import Loading from "../../Components/Common/Loading.jsx";
import Alert from "../../Components/Common/Alert.jsx";
import { useTheme } from "../../Context/useTheme.js";

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
    const loadInitialProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات کاربر:", err);
        setError("دریافت اطلاعات کاربر با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };
    loadInitialProfile();
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
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700/70 transition-colors duration-200 dir-rtl">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50 border-b border-neutral-200 dark:border-neutral-700/70 pb-4">
        تنظیمات حساب کاربری
      </h1>

      {successMessage && (
        <div className="mb-6">
          <Alert type="success" message={successMessage} />
        </div>
      )}

      {/* Theme settings */}
      <div className="mb-8 p-4 sm:p-5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-700/50 rounded-2xl flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            پوسته برنامه (Theme)
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            حالت فعلی:{" "}
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {theme === "dark" ? "تاریک (Dark)" : "روشن (Light)"}
            </span>
          </p>
        </div>

        <button
          onClick={toggleTheme}
          type="button"
          className="px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all text-sm font-semibold shadow-sm shrink-0 flex items-center gap-2"
        >
          {theme === "dark" ? "حالت روشن ☀️" : "حالت تاریک 🌙"}
        </button>
      </div>

      {/* Profile settings */}
      {!isEditing ? (
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            مشخصات کاربری
          </h2>

          <div className="flex justify-between items-center p-3.5 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-700/40 rounded-xl">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              نام:
            </span>
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              {profile?.firstname || profile?.firstName || "ثبت نشده"}
            </span>
          </div>

          <div className="flex justify-between items-center p-3.5 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-700/40 rounded-xl">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              نام کاربری:
            </span>
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 dir-ltr">
              @{profile?.username || "ثبت نشده"}
            </span>
          </div>

          <div className="flex justify-between items-center p-3.5 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-700/40 rounded-xl">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              نقش:
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg border bg-neutral-100 dark:bg-neutral-700/60 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600/50">
              {profile?.role === "admin" ? "مدیر سیستم" : "کاربر عادی"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full mt-6 px-4 py-2.5 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold rounded-xl transition-all shadow-sm text-sm"
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
