import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function Home() {
  return (
    <HelmetProvider>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Realtor | Home</title>
     </Helmet>
    <div>
      home
    </div>
    </HelmetProvider>
  )
}
