import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const user = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 200) {
        const result = await response.json();
        setSuccess(true);
        // Store tokens if necessary
        document.cookie = `accessToken=${result.data.accessToken}; path=/`;
        document.cookie = `refreshToken=${result.data.refreshToken}; path=/`;
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect after 2 seconds
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-200 m-20 p-20 rounded-3xl">
        <NavLink to="/">
          <img className="h-24" src={Logo} alt="Logo" />
        </NavLink>
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form
          className="flex flex-col items-center w-3/6"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6 bg-white"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6 bg-white"
            placeholder="Password"
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-green-500">Login successful! Redirecting...</p>
          )}
          <div className="flex flex-col">
            <button
              type="submit"
              className="w-60 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-xl"
            >
              Login
            </button>
            <hr className="border-1 my-4 w-full" />
            <NavLink
              to="/signup"
              className="w-60 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl"
            >
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
