import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Realtor | Sign-In</title>
      </Helmet>
      <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
        <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto gap-8">
          <div className="md:w-[67%] lg:w-[50%] flex justify-center items-center p-1">
            <img
              className="rounded-2xl w-full"
              src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
              alt="key"
            />
          </div>
          <div className="w-full md:w-[67%] lg:w-[40%]">
            <form className="flex  flex-col item-center justify-center gap-6">
              <input
                className="w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out"
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
              />
              <div className="relative">
              <input
                className="w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (<AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword((prevState)=>!prevState) }/>) : (<AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword(prevState=>!prevState) }/>)}
              </div>
              <div className="flex flex-col sm:flex-row item-center justify-center text-center sm:text-start sm:justify-between p-1 whitespace-nowrap text-sm sm:text-lg">
                <p className="mb-6">Don't have a account?
                <Link to="/sign-up" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">Register</Link>
                </p>
                <p>
                <Link to="/forget-password" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Forgot Password!</Link>
                </p>
              </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-7 py-3 text-sm sm:text-lg font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">Sign In</button>
            <div className="my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
              <OAuth/>
            </form>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
