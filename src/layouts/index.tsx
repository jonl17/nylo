import React from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { PageProps } from 'gatsby'
import SecondaryNavBar from '~/components/Site/SecondaryNavBar'
import { useLocation } from '@reach/router'

interface Props extends PageProps {
  pageContext: {
    hasSubmenu: null | string
  }
}

const Layout: React.FC<Props> = ({ children, pageContext }) => {
  const { pathname } = useLocation()

  return (
    <main>
      <NavBar />
      {pathname.includes(`/um-nylo`) && <SecondaryNavBar submenu="um-nylo" />}
      {children}
      <Banner />
    </main>
  )
}

export default Layout
