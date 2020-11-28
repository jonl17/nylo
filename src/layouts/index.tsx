import React from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { PageProps } from 'gatsby'
import SecondaryNavBar from '~/components/Site/SecondaryNavBar'

const Layout: React.FC<PageProps> = ({ children, pageContext }) => {
  console.log(pageContext.hasSubmenu)
  return (
    <main>
      <NavBar />
      {pageContext.hasSubmenu && (
        <SecondaryNavBar submenuId={pageContext.hasSubmenu} />
      )}
      {children}
      <Banner />
    </main>
  )
}

export default Layout
