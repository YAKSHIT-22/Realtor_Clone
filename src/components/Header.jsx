import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathMathRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-2 sm:px-4 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={()=>navigate("/")}
          />
        </div>
        <div>
          <ul className="flex gap-6 xs:gap-8 justify-center items-center">
            <li onClick={()=>navigate("/")}
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/") && "text-black border-b-red-600"
              }`}
            >
              Home
            </li>
            <li onClick={()=>navigate("/offers")} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/offers") && "text-black border-b-red-600"
              }`}>Offers</li>
            <li onClick={()=>navigate("/sign-in")} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/sign-in") && "text-black border-b-red-600"
              }`}>Sign In</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
