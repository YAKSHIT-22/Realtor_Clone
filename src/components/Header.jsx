import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  React.useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
          if(user){
            setPageState("Profile");
          }else{
               setPageState("Sign in");
          }
      })
  },[auth])
  const [pageState,setPageState] = React.useState("Sign in")
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-2 sm:px-4 max-w-6xl mx-2 xxs:mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-4 w-auto sm:h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex gap-4 xs:gap-6 sm:gap-8 justify-center items-center">
            <li
              onClick={() => navigate("/")}
              className={`cursor-pointer py-3 text-xs xxs:text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-600"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => navigate("/offers")}
              className={`cursor-pointer py-3 text-xs xxs:text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-red-600"
              }`}
            >
              Offers
            </li>
            <li
              onClick={() => navigate("/profile")}
              className={`cursor-pointer py-3 text-xs xxs:text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-red-600"
              }`}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
