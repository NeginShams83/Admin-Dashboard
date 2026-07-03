import Input from "../Components/Input";

function Login() {
  return (
    <>
      <div className="flex flex-col items-center  justify-center h-96 bg-gray-300  rounded-2xl gap-5  text-black">
        {" "}
        <h1 className="text-2xl mb-10">Welcome to the Login</h1>
        <Input
          id="username"
          label="Username :"
          type="text"
          placeholder="Enter your username..."
          className={
            "m-4 outline-none text-white px-4 py-1 bg-blue-900 rounded-lg "
          }
        />
        <Input
          id="password"
          label="Password :"
          type="password"
          placeholder="Enter your password..."
          className={
            "m-4 outline-none text-white px-4 py-1 bg-blue-900 rounded-lg "
          }
        />
      </div>
    </>
  );
}

export default Login;
