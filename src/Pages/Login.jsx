import Input from "../Components/Common/Input";
import Button from "../Components/Common/Button";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setServerError("");

    // Simple validation
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
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { token, role } = response.data;
      const userData = { username, role };

      // Update context and storage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      // Redirect by role
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "خطا در برقراری ارتباط با سرور";
      setServerError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-96 bg-[#B4B5BB] rounded-2xl gap-5 text-black">
      <h1 className="text-2xl mb-5">Welcome to the Login</h1>

      {serverError && (
        <div className="text-red-600 bg-red-100 px-4 py-1 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <Input
          id="username"
          label="Username :"
          type="text"
          placeholder="Enter your username..."
          className="m-4 outline-none text-white focus:ring-1 ring-white px-4 py-1 bg-[#385894] transition-all hover:bg-[#2c3e70] rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={usernameError}
        />
        <Input
          id="password"
          label="Password :"
          type="password"
          placeholder="Enter your password..."
          className="m-4 outline-none text-white focus:ring-1 ring-white px-4 py-1 bg-[#385894] transition-all hover:bg-[#2c3e70] rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        <Button
          type="submit"
          className="bg-[#385894] hover:bg-[#2c3e70] text-white px-4 py-1 rounded-lg transition-all mt-2"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
