import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const skills = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "Ruby",
    "PHP",
    "Swift",
    "TypeScript",
    "SQL",
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "MongoDB",
    "Firebase",
  ];

  const handleSkillChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSkills((prev) =>
      checked ? [...prev, name] : prev.filter((skill) => skill !== name)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const user = {
      username,
      email,
      password,
      skills: selectedSkills,
    };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect after 2 seconds
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError("An error occurred while creating your account.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-200 m-10 p-10 rounded-3xl">
        <NavLink to="/">
          <img className="h-24" src={Logo} alt="Logo" />
        </NavLink>

        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <label className="text-left w-5/6 font-bold">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6"
            placeholder="Username"
          />
          <label className="text-left w-5/6 font-bold">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6"
            placeholder="Email"
          />
          <label className="text-left w-5/6 font-bold">Skills:</label>
          <div className="flex flex-row flex-wrap w-full mb-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center w-1/6 ml-36">
                <input
                  type="checkbox"
                  name={skill}
                  id={skill}
                  className="mr-2 m-2"
                  onChange={handleSkillChange}
                />
                <label htmlFor={skill}>{skill}</label>
              </div>
            ))}
          </div>
          <label className="text-left w-5/6 font-bold">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6"
            placeholder="Password"
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-green-500">
              User created successfully! Redirecting...
            </p>
          )}
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-xl"
            >
              Sign Up
            </button>

            <NavLink
              to="/login"
              className="mt-4 w-60 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl"
            >
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
