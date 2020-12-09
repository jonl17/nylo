import React from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { PageProps } from 'gatsby'
import { Helmet } from 'react-helmet'
import favicon from '../../static/fav.png'
import Modal from '~/components/Site/Modal'

interface Props extends PageProps {
  pageContext: {
    hasSubmenu: null | string
  }
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Living Art Museum</title>
        <link rel='shortcut icon' href={favicon} type='image/png' />
      </Helmet>
      <main id='main-wrapper'>
        <NavBar />
        {children}
        <Banner />
      </main>
    </>
  )
}

export default Layout
