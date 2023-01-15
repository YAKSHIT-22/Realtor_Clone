import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name: name,
        });
      }
      toast.success("Profile Details Updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Realtor | Profile</title>
      </Helmet>
      <>
        <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
          <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-6 px-2 gap-4">
            <form className="w-full flex flex-col items-center justify-center mt-6 px-2 gap-4">
              <input
                type="text"
                id="name"
                value={name}
                disabled={!changeDetail}
                onChange={onChange}
                className={
                  "w-full px-4 py-2 text-xl text-gray-700 rounded transition ease-in-out" +
                  (changeDetail
                    ? "bg-red-200 focus:bg-red-200"
                    : " bg-white border border-gray-300")
                }
              />

              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              />

              <div className="w-full flex items-center justify-between flex-row whitespace-nowrap text-sm">
                <p className="flex items-center justify-center flex-row gap-1">
                  Want to change your name?
                  <span
                    onClick={() => {
                      changeDetail && onSubmit();
                      setChangeDetail((prevState) => !prevState);
                    }}
                    className="text-red-600 hover:text-red-700 transition ease-in-out duration-150 ml-1 cursor-pointer"
                  >
                    {changeDetail ? "Apply Change" : "Edit"}
                  </span>
                </p>
                <p
                  onClick={onLogout}
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
                >
                  Sign Out!
                </p>
              </div>
            </form>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-xs xxs:text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out flex items-center justify-center flex-row gap-3 active:bg-blue-800"
            >
              <Link
                to="/create-listing"
                className="flex items-center justify-center gap-3 flex-row"
              >
                <FcHome className="text-3xl bg-red-200 rounded-full border-2 p-1" />
                Sell or rent your home
              </Link>
            </button>
          </div>
        </section>
      </>
    </HelmetProvider>
  );
}
