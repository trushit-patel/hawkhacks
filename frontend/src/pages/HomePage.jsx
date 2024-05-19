import React from "react";
import HomePageImage from "../assets/images/homepage.png";
import { NavLink } from "react-router-dom";
function HomePage() {
  return (
    <>
      <div className="flex flex-row items-center justify-around h-full">
        <div className="w-2/4">
          <img src={HomePageImage} alt="Job Application Tracker" />
        </div>
        <div className="text-center flex flex-col">
          <NavLink
            to="/resume-reviewer"
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 my-4 rounded-full"
          >
            Resume Reviewer
          </NavLink>

          <NavLink
            to="/cover-letter-generator"
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 my-4 rounded-full"
          >
            Cover Letter Generator
          </NavLink>

          <NavLink
            to="/job-suggestions"
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 my-4 rounded-full"
          >
            Job Suggestions
          </NavLink>

          <NavLink
            to="/job-tracker"
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 my-4 rounded-full"
          >
            Job Tracker
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default HomePage;
