import React from "react";
import Logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <nav
      className="rounded-full w-full border-b-2 border-purple-600 shadow-lg -m-4"
      style={{ backgroundColor: "#E9A89B" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="al">
            <NavLink to="/">
              <img className="h-16" src={Logo} alt="Logo" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
