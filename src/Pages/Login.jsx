import Button from "../Components/Common/Button";
import Alert from "../Components/Common/Alert";
import { useState } from "react";
import { useAuth } from "../Context/useAuth.js";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setServerError("");

    let hasError = false;
    if (!username.trim()) {
      setUsernameError("نام کاربری الزامی است");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("رمز عبور الزامی است");
      hasError = true;
    }
    if (hasError) return;

    try {
      setLoading(true);
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { token, role } = response.data;
      const userData = { username, role };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "خطا در برقراری ارتباط با سرور";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 dir-rtl">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/70 rounded-2xl shadow-xl p-8 transition-colors duration-200">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            ورود به حساب کاربری
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            برای دسترسی به داشبورد اطلاعات خود را وارد کنید
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="mb-5">
            <Alert type="error" message={serverError} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200">
              نام کاربری
            </label>
            <input
              type="text"
              placeholder="نام کاربری خود را وارد کنید..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm outline-none transition focus:border-neutral-400 dark:focus:border-neutral-500"
            />
            {usernameError && (
              <p className="text-xs text-rose-500 font-medium">
                {usernameError}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200">
              رمز عبور
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm outline-none transition focus:border-neutral-400 dark:focus:border-neutral-500"
            />
            {passwordError && (
              <p className="text-xs text-rose-500 font-medium">
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold rounded-xl transition-all shadow-sm text-sm mt-3 disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
