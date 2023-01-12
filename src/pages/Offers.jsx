import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function Offers() {
  return (
    <HelmetProvider>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Realtor | Offers</title>
     </Helmet>
    <div>Offers</div>
    </HelmetProvider>
  )
}
