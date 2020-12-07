import React from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { PageProps } from 'gatsby'

interface Props extends PageProps {
  pageContext: {
    hasSubmenu: null | string
  }
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main>
      <NavBar />
      {children}
      <Banner />
    </main>
  )
}

export default Layout
