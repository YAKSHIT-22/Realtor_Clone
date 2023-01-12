import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check for the user

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success("Successful")
      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  }
  return (
    <button type="button" onClick={onGoogleClick} className="flex text-sm sm:text-lg items-center justify-center w-full bg-red-600 text-white gap-4 px-7 py-3 uppercase font-medium hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md active:shadow-lg transition duration-150 ease-in-out rounded">
        <FcGoogle className='text-2xl bg-white rounded-full'/>
        Continue with Google</button>
  )
}
