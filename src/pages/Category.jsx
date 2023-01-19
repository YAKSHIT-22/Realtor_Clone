import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  collection,
  orderBy,
  query,
  where,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";

export default function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
    }
    fetchListings();
  }, [params.categoryName]);

  async function onFetchMoreListing(){
    try {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState)=>[...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listing");
    }
  }


  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Realtor | Category</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-3 gap-3 flex items-center flex-col justify-center">
        <h1 className="text-3xl text-center mt-6 font-semibold">{params.categoryName === "rent" ? "Places for rent" : "Places for sale"}</h1>
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <div className="w-full mt-4 flex items-start flex-col justify-center gap-2">
              <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 my-2 p-1">
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
              </ul>
            </div>
            {lastFetchListing && (
              <div className="flex justify-center items-center flex-row mt-3 mb-3">
                <button onClick={onFetchMoreListing} className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 hover:border-slate-600 rounded transition duration-150 ease-in-out">
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-xl text-center mt-6 p-1 font-normal text-blue-700">
            There are no current {params.categoryName === "rent" ? "places for rent" : "places for sale" }
          </p>
        )}
      </div>
    </HelmetProvider>
  );
}
