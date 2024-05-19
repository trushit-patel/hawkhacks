import React from "react";

import Logo from "../assets/images/logo.png";
function SignUp() {
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
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-200 m-10 p-10 rounded-3xl">
        <img className="h-24" src={Logo} alt="Logo" />

        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <form className="flex flex-col items-center">
          <label className="text-left w-5/6 font-bold">Username:</label>
          <input
            type="text"
            name="username"
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6"
            placeholder="Username"
          />
          <label className="text-left w-5/6 font-bold">Skills:</label>
          <div className="flex flex-row flex-wrap">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center w-1/6 ml-36">
                <input
                  type="checkbox"
                  name={skill}
                  id={skill}
                  className="mr-2 m-2"
                />
                <label htmlFor={skill}>{skill}</label>
              </div>
            ))}
          </div>
          <label className="text-left w-5/6 font-bold">Password:</label>
          <input
            type="password"
            name="password"
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6"
            placeholder="Password"
          />
          <div className="flex">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-xl"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
