import Input from "../Components/Input";

function Login() {
  return (
    <>
      <div className="flex flex-col items-center  justify-center h-96 bg-[#B4B5BB]  rounded-2xl gap-5  text-black">
        {" "}
        <h1 className="text-2xl mb-10">Welcome to the Login</h1>
        <Input
          id="username"
          label="Username :"
          type="text"
          placeholder="Enter your username..."
          className={
            "m-4 outline-none text-white focus:ring-1 ring-white px-4 py-1 bg-[#385894] transition-all hover:bg-[#2c3e70]  rounded-lg "
          }
        />
        <Input
          id="password"
          label="Password :"
          type="password"
          placeholder="Enter your password..."
          className={
            "m-4 outline-none text-white focus:ring-1 ring-white px-4 py-1 bg-[#385894] hover:bg-[#2c3e70] transition-all rounded-lg "
          }
        />
        <button className="bg-[#385894] text-white px-5 py-1 rounded-lg hover:bg-[#2c3e70] transition-all ">
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
