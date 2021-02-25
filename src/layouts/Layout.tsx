import React, { Fragment } from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { Helmet } from 'react-helmet'
import favicon from '../../static/fav.png'
import Footer from '~/components/Site/Footer'
import { bgSetter } from '~/utils'
import MobileHeader from '~/components/Site/MobileHeader'
import useGetAnnouncement from '~/hooks/useGetAnnouncement'

const Layout: React.FC<{
  page: any
  mainMenu: any[]
  pageContext: any
}> = ({ children, page, mainMenu, pageContext: pCtx }) => {
  console.log(pCtx)

  return (
    <Fragment>
      <Helmet>
        <title>Living Art Museum</title>
        <link rel='shortcut icon' href={favicon} type='image/png' />
      </Helmet>
      {/* 
      <main id='main-wrapper'>
        <NavBar customPostType={page.type} mainMenu={mainMenu} />
        <MobileHeader />
        <div className={bgSetter(page)}>{children}</div>
        <Footer />
      </main>
      */}
      <Banner ctx={pCtx} />
    </Fragment>
  )
}

export default Layout
