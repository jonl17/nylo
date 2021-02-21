import React, { Fragment } from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { Helmet } from 'react-helmet'
import favicon from '../../static/fav.png'
import Footer from '~/components/Site/Footer'
import { bgSetter } from '~/utils'
import MobileHeader from '~/components/Site/MobileHeader'

const Layout: React.FC<{
  pageContext: any
  mainMenu: any[]
}> = ({ children, pageContext, mainMenu }) => {
  return (
    <Fragment>
      <Helmet>
        <title>Living Art Museum</title>
        <link rel='shortcut icon' href={favicon} type='image/png' />
      </Helmet>

      <main id='main-wrapper'>
        <NavBar customPostType={pageContext.type} mainMenu={mainMenu} />
        <MobileHeader />
        <div className={bgSetter(pageContext)}>{children}</div>
        <Footer />
      </main>

      <Banner page={pageContext} />
    </Fragment>
  )
}

export default Layout
