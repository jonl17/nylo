import React, { Fragment, useEffect, useMemo } from 'react'
import NavBar from '~/components/Site/NavBar'
import Banner from '~/components/Site/Banner'
import { Helmet } from 'react-helmet'
import favicon from '../../static/fav.png'
import Footer from '~/components/Site/Footer'
import MobileHeader from '~/components/Site/MobileHeader'
import { GatsbyLinkProps } from 'gatsby'
import { gsap } from 'gsap'
import cn from 'classnames'
import { Language } from 'balkan-tungumal/lib/dict'

const META: { description: { [key in Language]: string } } = {
  description: {
    is:
      'Nýlistasafnið er listamannarekið safn og sýningarrými með það að markmiði að varðveita og sýna samtímalist og vera vettvangur fyrir tilraunir og alþjóðlega umræðu um myndlist.',
    'en-us':
      'The Living Art Museum is an artist-run museum and exhibition space with the aim of preserving and exhibiting contemporary art and being a forum for experiments and international discussion about art.',
  },
}

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

  return (
    <Fragment>
      <Helmet>
        <title>
          {pCtx.lang === 'en-us' ? 'Living Art Musem' : 'Nýlistasafnið'}
        </title>

        <link rel='shortcut icon' href={favicon} type='image/png' />
        <meta charSet='utf-8' />

        <meta name='description' content={META.description[pCtx.lang]} />
        <meta
          name='keywords'
          content='Fine arts, art, Icelandic art, Nýlistasafnið, Living Art Museum'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <html lang={pCtx.lang} />
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
