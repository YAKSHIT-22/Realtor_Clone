import { collection, orderBy, query, where, limit, getDocs } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom';
import Slider from '../components/Slider'
import { db } from '../firebase';
import ListingItem from '../components/ListingItem'

export default function Home() {
  const [offerListings, setOfferListings] = useState(null);
  useEffect(()=>{
        async function fetchListings(){
          try{
            const listingsRef = collection(db, "listings");
            const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4));  
            const querySnap = await getDocs(q);
            const listings = [];
            querySnap.forEach((doc) => {
              return listings.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            setOfferListings(listings);
            
          }catch(error){
              console.log(error);
          }
        }
        fetchListings()
  },[])
  const [rentListings, setRentListings] = useState(null);
  useEffect(()=>{
        async function fetchListings(){
          try{
            const listingsRef = collection(db, "listings");
            const q = query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4));  
            const querySnap = await getDocs(q);
            const listings = [];
            querySnap.forEach((doc) => {
              return listings.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            setRentListings(listings);
            
          }catch(error){
              console.log(error);
          }
        }
        fetchListings()
  },[])
  const [saleListings, setSaleListings] = useState(null);
  useEffect(()=>{
        async function fetchListings(){
          try{
            const listingsRef = collection(db, "listings");
            const q = query(listingsRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(4));  
            const querySnap = await getDocs(q);
            const listings = [];
            querySnap.forEach((doc) => {
              return listings.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            setSaleListings(listings);
            
          }catch(error){
              console.log(error);
          }
        }
        fetchListings()
  },[])
  return (
    <HelmetProvider>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Realtor | Home</title>
     </Helmet>
    <div>
      <Slider/>
      <div className='max-w-6xl mx-auto p-1 gap-3 flex items-start flex-col justify-center'>
        {offerListings && offerListings.length > 0 && (
          <div className="w-full mt-4 flex items-start flex-col justify-center gap-2">
            <h2 className="px-2 ml-1 mt-1 text-xl font-semibold">Recent offers</h2>
            <Link to="/offers">
            <p className="px-2 ml-1  text-xs text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more Offers</p>
            </Link>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 my-2 p-1">
              {offerListings.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="w-full mt-4 flex items-start flex-col justify-center gap-2">
            <h2 className="px-2 ml-1 mt-1 text-xl font-semibold">Places for rent</h2>
            <Link to="/category/rent">
            <p className="px-2 ml-1  text-xs text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for rent</p>
            </Link>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 my-2 p-1">
              {rentListings.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="w-full mt-4 flex items-start flex-col justify-center gap-2">
            <h2 className="px-2 ml-1 mt-1 text-xl font-semibold">Places for sale</h2>
            <Link to="/category/sale">
            <p className="px-2 ml-1  text-xs text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for sale</p>
            </Link>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 my-2 p-1">
              {saleListings.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </HelmetProvider>
  )
}
