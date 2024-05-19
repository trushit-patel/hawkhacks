import React from "react";

import Logo from "../assets/images/logo.png";
function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-200 m-20 p-20 rounded-3xl">
        <img className="h-24" src={Logo} alt="Logo" />
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form className="flex flex-col items-center w-3/6">
          <input
            type="text"
            name="username"
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6 bg-white"
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6 bg-white"
            placeholder="Password"
          />
          <div className="flex">
            <button
              type="submit"
              className="w-60 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-xl"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
