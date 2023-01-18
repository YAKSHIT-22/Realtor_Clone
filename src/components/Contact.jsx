import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Contact({userRef, listing}) {
   const [landlord, setLandlord] = useState(null);
   const [message, setMessage] = useState("");
   useEffect(()=>{
        async function getLandlord(){
              const docRef = doc(db,"users",userRef);
              const docSnap = await getDoc(docRef);
              if(docSnap.exists()){
                  setLandlord(docSnap.data())
              }else{
                toast.error("Could not get Landlord data");
              }
        }
        getLandlord();
   },[userRef]);
   function onChange(e){
       setMessage(e.target.value)
   } 
  return (
    <div className='flex items-start flex-col justify-center'>
      {landlord !== null && (
        <div className='flex items-start flex-col gap-4 justify-center w-full'>
            <p>Contact {landlord.name} for the {listing.name.toLowerCase()}.</p>
            <div className="flex items-start justify-center">
                <textarea className='p-2 w-full text-md text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600' name="message" id="message" placeholder="Type your message!"  cols="30" rows="4" value={message} onChange={onChange} ></textarea>
            </div>
            <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}><button type="button" className="px-7 py-3 bg-blue-600 text-white font-medium text-xs sm:test-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg w-full text-center transition duration-150 ease-in-out mb-3">SEND MESSAGE!</button></a>
         </div>   
      )}
    </div>
  )
}
