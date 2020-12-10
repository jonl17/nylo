import React from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { PageProps } from 'gatsby'
import { Helmet } from 'react-helmet'
import favicon from '../../static/fav.png'
import { ModalProvider } from '../context/ModalContext'

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

      <ModalProvider>
        <main id='main-wrapper'>
          <NavBar />
          {children}
        </main>

        <Banner />
      </ModalProvider>
    </>
  )
}

export default Layout
