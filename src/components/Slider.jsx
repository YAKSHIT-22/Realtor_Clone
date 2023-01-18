import React, { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <>No Data To Show</>;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          module={[EffectFade]}
          autoplay={{ delay: 4000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="w-full relative h-[19rem] overflow-hidden"
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-normal max-w-[90%] bg-[#3b87b7] p-2 rounded-br-2xl text-md shadow-lg">
                {data.name}
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-3 font-medium max-w-[90%] bg-[#e63946] p-2 rounded-tr-2xl text-md shadow-lg">
                $ {data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && " / month" }
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
