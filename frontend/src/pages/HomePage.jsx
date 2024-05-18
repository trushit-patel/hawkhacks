import React from "react";
import HomePageImage from "../assets/images/homepage.png";
function HomePage() {
  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <div className="w-1/2">
          <img src={HomePageImage} alt="Job Application Tracker" />
        </div>
        <div className="w-1/2 text-center">
          <h1 className="text-4xl font-bold">Job Application Tracker</h1>
          <p className="text-lg">Track your job applications with ease</p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
