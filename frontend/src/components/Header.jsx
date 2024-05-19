import React, { useContext } from "react";
import Logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";
function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

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
          <div className="flex-grow" />
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/profile"
                  className="text-white font-bold px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500"
                >
                  Profile
                </NavLink>
                <button
                  onClick={logout}
                  className="text-white font-bold px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="text-white font-bold px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
