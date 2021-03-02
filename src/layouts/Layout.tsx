import React, { Fragment, useEffect } from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { Helmet } from 'react-helmet'
import favicon from '../../static/fav.png'
import Footer from '~/components/Site/Footer'
import MobileHeader from '~/components/Site/MobileHeader'
import { GatsbyLinkProps } from 'gatsby'
import { gsap } from 'gsap'
import cn from 'classnames'

const Layout: React.FC<{
  page: any
  mainMenu: any[]
  pageContext: any
  location: GatsbyLinkProps<{ animate?: boolean }>
}> = ({ children, pageContext: pCtx, location }) => {
  useEffect(() => {
    if (location.state?.animate) {
      const el = document.getElementById('bg__animate')
      if (typeof window !== undefined && window.innerWidth > 650) {
        gsap.from(el, {
          x: -200,
          duration: 0.2,
          ease: 'power3',
        })
      }
    }
  }, [location.state])

  return (
    <Fragment>
      <Helmet>
        <title>
          {pCtx.lang === 'en-us' ? 'Living Art Musem' : 'Nýlistasafnið'}
        </title>
        <link rel='shortcut icon' href={favicon} type='image/png' />
      </Helmet>

      <main id='main-wrapper'>
        <NavBar lang={pCtx.lang} type={pCtx.type} />
        <MobileHeader lang={pCtx.lang} bg={pCtx.bg} />
        <div id='bg__animate' className={cn('bg', pCtx.bg)}>
          {children}
        </div>
        <Footer lang={pCtx.lang} />
      </main>

      <Banner ctx={pCtx} />
    </Fragment>
  )
}

export default Layout
