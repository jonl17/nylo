import React, { useContext, useMemo } from 'react'
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
  }
}> = ({ children, pageContext }) => {
  const { modify } = useContext(LanguageContext)

  useMemo(() => {
    if (pageContext.url.includes('/en/')) {
      modify('en-us')
    } else {
      modify('is')
    }
  }, [pageContext.url])
  console.log(pageContext.url)

  return (
    <>
      <Helmet>
        <title>Living Art Museum</title>
        <link rel='shortcut icon' href={favicon} type='image/png' />
      </Helmet>

      <main id='main-wrapper'>
        <NavBar />
        <div className={bgSetter(pageContext)}>{children}</div>
        <Footer />
      </main>

      <Banner />
    </>
  )
}

export default Layout
