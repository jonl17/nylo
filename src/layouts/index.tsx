import React from "react"
import NavBar from "~/components/NavBar"
import Banner from "~/components/Banner"

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
