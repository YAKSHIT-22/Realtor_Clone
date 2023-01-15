import React from "react";
import { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address:"",
    description:"",
    offer: true,
    regularPrice:0,
    discountedPrice:0,
  });
  const { type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice } = formData;
  function onChange(e) {}
  return (
    <main className="max-w-md px-2 mx-auto flex item-center flex-col gap-2 justify-center">
      <h1 className="text-2xl text-center mt-6 font-bold">Create a Listing</h1>
      <form className="w-full flex items-start justify-center gap-4 flex-col p-1">
        <p className="text-lg mt-6 font-semibold w-full">Sell / Rent</p>
        <div className="flex items-center justify-center w-full flex-row gap-4">
          <button
            className={`px-7 py-3 
            font-medium text-sm uppercase shadow-md rounded 
            hover:shadow-md focus:shadow-lg active:shadow-lg 
            transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
          >
            Sell
          </button>
          <button
            className={`px-7 py-3 
            font-medium text-sm uppercase shadow-md rounded 
            hover:shadow-md focus:shadow-lg active:shadow-lg 
            transition duration-150 ease-in-out w-full ${
              type === "sell"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
          >
            Rent
          </button>
        </div>
        <label className="text-lg mt-2 font-semibold text-start flex items-center justify-start">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          className="w-full p-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
          placeholder="Name"
          maxLength="32"
          minLength="10"
          onChange={onChange}
          required
        />
        <div className="flex mt-2 items-center justify-center flex-row w-full gap-4">
          <div className="w-full flex items-start justify-center flex-col">
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div className="w-full flex items-start justify-center flex-col">
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        <p className="text-lg mt-2 font-semibold w-full">Parking Spot</p>
        <div className="flex items-center justify-center w-full flex-row gap-4">
          <button
            className={`px-7 py-3 
            font-medium text-sm uppercase shadow-md rounded 
            hover:shadow-md focus:shadow-lg active:shadow-lg 
            transition duration-150 ease-in-out w-full ${
              !parking
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`px-7 py-3 
            font-medium text-sm uppercase shadow-md rounded 
            hover:shadow-md focus:shadow-lg active:shadow-lg 
            transition duration-150 ease-in-out w-full ${
              parking
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-2 font-semibold w-full">Furnished</p>
        <div className="flex items-center justify-center w-full flex-row gap-4">
          <button
            className={`px-7 py-3 
            font-medium text-sm uppercase shadow-md rounded 
            hover:shadow-md focus:shadow-lg active:shadow-lg 
            transition duration-150 ease-in-out w-full ${
              !furnished
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`px-7 py-3 
            font-medium text-sm uppercase shadow-md rounded 
            hover:shadow-md focus:shadow-lg active:shadow-lg 
            transition duration-150 ease-in-out w-full ${
              furnished
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
          >
            no
          </button>
        </div>
        <label className="text-lg mt-2 font-semibold text-start flex items-center justify-start">
          Address
        </label>
        <textarea
          type="text"
          id="address"
          value={address}
          className="w-full p-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
          placeholder="Address"
          onChange={onChange}
          required
        />
        <label className="text-lg mt-2 font-semibold text-start flex items-center justify-start">
          Description
        </label>
        <textarea
          type="text"
          id="description"
          value={description}
          className="w-full p-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
          placeholder="Description"
          onChange={onChange}
          required
        />
         <p className="text-lg mt-2 font-semibold w-full">Offers</p>
        <div className="flex items-center justify-center w-full flex-row gap-4">
          <button
            className={`px-7 py-3 
            font-medium text-sm uppercase shadow-md rounded 
            hover:shadow-md focus:shadow-lg active:shadow-lg 
            transition duration-150 ease-in-out w-full ${
              !offer
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`px-7 py-3 
            font-medium text-sm uppercase shadow-md rounded 
            hover:shadow-md focus:shadow-lg active:shadow-lg 
            transition duration-150 ease-in-out w-full ${
              offer
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <div className="items-center justify-center flex mt-2">
          <div className="flex items-start justify-center flex-col gap-4">
            <p className="text-lg font-semibold">Regular Price</p>
            <div className="flex items-center justify-center flex-row gap-4">
              <input type="number" id="regularPrice" value={regularPrice} onChange={onChange} min="50" max="400000000" required className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"/>
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                  </div>
              )}
              </div>
          </div>
        </div>
        {offer && ( <div className="items-center justify-center flex mt-2">
          <div className="flex items-start justify-center flex-col gap-4">
            <p className="text-lg font-semibold">Discounted Price</p>
            <div className="flex items-center justify-center flex-row gap-4">
              <input type="number" id="discountedPrice" value={discountedPrice} onChange={onChange} min="50" max="400000000" required={offer} className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"/>
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                  </div>
              )}
              </div>
          </div>
        </div>) }
        <div className="mb-6 flex items-start justify-center flex-col gap-2">
          <p className="font-semibold text-lg">Images</p>
          <p className="text-gray-600">The first image will be the cover (max 6)</p>
          <input type="file" onChange={onChange} id="images" accept=".jpg,.png,.jpeg" multiple required className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600" />
        </div>
        <button type="submit" className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-md focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Create Listing</button>
      </form>
    </main>
  );
}
