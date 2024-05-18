import React from "react";
import Logo from "../assets/images/logo.png";
function Header() {
  return (
    <nav
      className="rounded-full w-full border-b-2 border-purple-600 shadow-lg"
      style={{ backgroundColor: "#E9A89B" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img className="h-16" src={Logo} alt="Logo" />
          </div>
          <div className="hidden md:block">
            <button className="bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-full">
              LogIn
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
