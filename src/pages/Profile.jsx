import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function Profile() {
  return (
    <HelmetProvider>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Realtor | Profile</title>
     </Helmet>
    <div>Profile</div>
    </HelmetProvider>
  )
}
