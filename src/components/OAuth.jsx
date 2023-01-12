import React from 'react'
import {FcGoogle} from 'react-icons/fc';

export default function OAuth() {
  return (
    <button className="flex text-sm sm:text-lg items-center justify-center w-full bg-red-600 text-white gap-4 px-7 py-3 uppercase font-medium hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md active:shadow-lg transition duration-150 ease-in-out rounded">
        <FcGoogle className='text-2xl bg-white rounded-full'/>
        Continue with Google</button>
  )
}
