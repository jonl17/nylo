import React from "react"
import NavBar from "~/components/Site/NavBar"
import Banner from "~/components/Site/Banner"

const Layout: React.FC<{ children: React.ReactChildren }> = ({ children }) => {
  return (
    <main>
      <NavBar />
      {children}
      <Banner />
    </main>
  )
}

export default Layout
