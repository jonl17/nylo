import React, { Fragment } from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { Helmet } from 'react-helmet'
import favicon from '../../static/fav.png'
import Footer from '~/components/Site/Footer'
import { bgSetter } from '~/utils'
import MobileHeader from '~/components/Site/MobileHeader'
import useGetAnnouncement from '~/hooks/useGetAnnouncement'
import { useBackground } from '~/context/backgroundContext'
import { pageResolver } from '~/utils/resolvers'

const Layout: React.FC<{
  page: any
  mainMenu: any[]
  pageContext: any
}> = ({ children, pageContext: pCtx }) => {
  return (
    <Fragment>
      <Helmet>
        <title>
          {pCtx.lang === 'en-us' ? 'Living Art Musem' : 'Nýlistasafnið'}
        </title>
        <link rel='shortcut icon' href={favicon} type='image/png' />
      </Helmet>

      <main id='main-wrapper'>
        <NavBar lang={pCtx.lang} />
        <MobileHeader lang={pCtx.lang} />
        <div className={pCtx.bg}>{children}</div>
        <Footer lang={pCtx.lang} />
      </main>

      <Banner ctx={pCtx} />
    </Fragment>
  )
}

export default Layout
