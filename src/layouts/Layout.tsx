import React, { Fragment, useEffect, useMemo } from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { Helmet } from 'react-helmet'
import Footer from '~/components/Site/Footer'
import MobileHeader from '~/components/Site/MobileHeader'
import { GatsbyLinkProps } from 'gatsby'
import { gsap } from 'gsap'
import cn from 'classnames'
import { Language } from 'balkan-tungumal/lib/dict'
import SEO from '~/components/Site/SEO'

const Layout: React.FC<{
  page: any
  mainMenu: any[]
  pageContext: {
    lang: Language
    type: string
    bg: string
    page: any
  }
  location: GatsbyLinkProps<{ animate?: boolean }>
}> = ({ children, pageContext: pCtx, location }) => {
  useEffect(() => {
    if (location.state?.animate) {
      const el = document.getElementById('bg__animate')
      if (typeof window !== undefined && window.innerWidth > 650) {
        gsap.from(el, {
          x: -200,
          duration: 0.4,
          ease: 'power2',
        })
      }
    }
  }, [location.state])

  const lang = pCtx.lang

  return (
    <Fragment>
      {useMemo(
        () => (
          <SEO lang={lang} />
        ),
        [lang]
      )}

      <main id='main-wrapper'>
        <NavBar lang={lang} type={pCtx.type} />
        <MobileHeader lang={lang} bg={pCtx.bg} />
        <div id='bg__animate' className={cn('bg', pCtx.bg)}>
          {children}
        </div>

        {useMemo(
          () => (
            <Footer lang={lang} />
          ),
          [lang]
        )}
      </main>

      <Banner ctx={pCtx} />
    </Fragment>
  )
}

export default Layout
