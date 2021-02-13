import React, { useContext, useEffect, Fragment } from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { Helmet } from 'react-helmet'
import favicon from '../../static/fav.png'
import Footer from '~/components/Site/Footer'
import { bgSetter } from '~/utils'
import { useLocation } from '@reach/router'
import { LanguageContext } from '~/context/LanguageContext'

const Layout: React.FC<{
  pageContext: {
    url: string
    alternateLanguage: string | null
    hasSubmenu: string
    type?: 'news' | 'exhibition'
  }
}> = ({ children, pageContext }) => {
  const { modify } = useContext(LanguageContext)

  useEffect(() => {
    if (pageContext.url) {
      if (pageContext.url.includes('/en/')) {
        modify('en-us')
      } else {
        modify('is')
      }
    }
  }, [pageContext.url])

  return (
    <Fragment>
      <Helmet>
        <title>Living Art Museum</title>
        <link rel='shortcut icon' href={favicon} type='image/png' />
      </Helmet>

      <main id='main-wrapper'>
        <NavBar customPostType={pageContext.type} />
        <div className={bgSetter(pageContext)}>{children}</div>
        <Footer />
      </main>

      <Banner />
    </Fragment>
  )
}

export default Layout
