import Input from "../Components/Input";
import Button from "../Components/Button";
import { useState } from "react";

function Login() {
  //state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //handle sub
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");

    let hasError = false;
    if (!username.trim()) {
      setUsernameError("error username");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("error password");
      hasError = true;
    }
    if (hasError) {
      return;
    }
  };
  return (
    <>
      <div className="flex flex-col items-center  justify-center h-96 bg-[#B4B5BB]  rounded-2xl gap-5  text-black">
        {" "}
        <h1 className="text-2xl mb-10">Welcome to the Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  justify-center items-center"
        >
          <Input
            id="username"
            label="Username :"
            type="text"
            placeholder="Enter your username..."
            className={
              "m-4 outline-none text-white focus:ring-1 ring-white px-4 py-1 bg-[#385894] transition-all hover:bg-[#2c3e70]  rounded-lg "
            }
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
          />
          <Input
            id="password"
            label="Password :"
            type="password"
            placeholder="Enter your password..."
            className={
              "m-4 outline-none text-white focus:ring-1 ring-white px-4 py-1 bg-[#385894] transition-all hover:bg-[#2c3e70]  rounded-lg "
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
          <Button
            type="submit"
            className={
              "bg-[#385894] hover:bg-[#2c3e70] text-white px-4 py-1 rounded-lg transition-all"
            }
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
