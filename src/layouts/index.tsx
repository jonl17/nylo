import React from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { PageProps } from 'gatsby'
import { Helmet } from 'react-helmet'
import favicon from '../../static/fav.png'
import Footer from '~/components/Site/Footer'
import { bgSetter } from '~/utils'
import { useLocation } from '@reach/router'
interface Props extends PageProps {
  pageContext: {
    hasSubmenu: null | string
  }
}

const Layout: React.FC<Props> = ({ children, pageContext }) => {
  const { pathname } = useLocation()
  return (
    <>
      <Helmet>
        <title>Living Art Museum</title>
        <link rel='shortcut icon' href={favicon} type='image/png' />
      </Helmet>

      <main id='main-wrapper'>
        <NavBar />
        <div className={bgSetter(pathname)}>{children}</div>
        <Footer />
      </main>

      <Banner />
    </>
  )
}

export default Layout
