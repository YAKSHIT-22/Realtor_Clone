import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import {
  FaMapMarkerAlt,
  FaShare,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

export default function Listing() {
  const auth = getAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const params = useParams();
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      } else {
        toast.error("No image Found");
      }
    }
    fetchListing();
  }, [params.listingID]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        module={[EffectFade]}
        autoplay={{ delay: 4000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[19rem]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fixed top-[11%] right-[3%] flex items-center justify-center z-10 flex-row-reverse gap-2 ">
        <div
          className=" bg-white cursor-pointer rounded-full border-1 border-gray-400 w-12 h-12 flex items-center justify-center"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          }}
        >
          <FaShare className="text-lg font-light text-slate-600" />
        </div>
        {shareLinkCopied && (
          <p className=" font-semibold border-2 border-gray-400 rounded-[4px] bg-white z-10 p-2 text-xs">
            Link Copied
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-start justify-center max-w-6xl lg:mx-auto m-4 p-4 rounded-sm shadow-md bg-white lg:gap-5">
        <div className="w-full h-full flex items-start flex-col justify-start md:ml-4 mt-3 gap-4">
          <p className="text-2xl font-semibold text-blue-900 flex items-center justify-start ">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex flex-row items-center justify-center gap-2  font-semibold">
            <FaMapMarkerAlt className="text-green-600" /> {listing.address}
          </p>
          <div className="flex items-center flex-row justify-start gap-2 w-[75%]">
            <p className="bg-red-800 w-full max-w-[12.5rem] h-auto rounded-md p-2 text-white text-center font-normal text-xs sm:text-sm shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>

            {listing.offer && (
              <p className="bg-green-800 whitespace-nowrap  w-full max-w-[12.5rem] h-auto rounded-md p-2 text-white text-center font-normal text-xs sm:text-sm shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} Discount
              </p>
            )}
          </div>
          <p className="flex flex-row items-center justify-start whitespace-pre-wrap">
            Description - &nbsp;{listing.description}
          </p>
          <ul className="mb-3 flex items-start justify-center gap-4 whitespace-nowrap lg:flex-row flex-col sm:flex-row md:flex-col">
            <li className="flex items-center justify-center gap-2 whitespace-nowrap">
              <FaBed className="text-lg" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center justify-center gap-2 whitespace-nowrap">
              <FaBath className="text-lg" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center justify-center gap-2 whitespace-nowrap">
              <FaParking className="text-lg" />
              {listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center justify-center gap-2 whitespace-nowrap">
              <FaChair className="text-lg" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="flex items-start justify-center w-full sm:w-[70%] md:w-[85%] lg:w-[55%]">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-xs sm:test-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out mb-3"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className="w-full mt-5 md:mt-0 md:ml-2 h-[12.5rem] sm:h-[17.5rem] md:h-[25rem] z-10 overflow-x-hidden">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{height:"100%", width:"100%"}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                {listing.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
