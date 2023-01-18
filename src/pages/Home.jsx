import React, { useState } from 'react'
import { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Slider from '../components/Slider'


export default function Home() {
  
  return (
    <HelmetProvider>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Realtor | Home</title>
     </Helmet>
    <div>
      <Slider/>
    </div>
    </HelmetProvider>
  )
}
