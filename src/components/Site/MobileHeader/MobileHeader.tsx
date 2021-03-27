import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Burger from '~/components/Site/Burger'
import { Language } from '~/lang'
import cn from 'classnames'
import useGetMainMenu from '~/hooks/useGetMainMenu'
import { useMobileMenu } from '~/context/mobileMenuContext'

const Title = ({ lang }: { lang: Language }) => {
  return (
    <Link to={lang === 'is' ? '/' : '/en-us'}>
      <h5 className='mb-0'>
        {lang === 'en-us' ? 'The Living Art Museum' : 'Nýlistasafnið'}
      </h5>
    </Link>
  )
}

const MobileHeader = ({ lang, bg }: { lang: Language; bg: string }) => {
  const { open, triggerMobileMenu } = useMobileMenu()

  const mainmenu = useGetMainMenu().find(node => node.lang === lang)

  return (
    <div
      className={cn('mobile-header d-block d-lg-none', {
        'mobile-header--expanded': open,
        [`${bg}`]: !open,
      })}
    >
      <div className={cn('d-flex justify-content-between mobile-header__head')}>
        <Burger onClick={() => triggerMobileMenu(!open)} expand={open} />
        <Title lang={lang} />
      </div>
      {mainmenu && (
        <div className='mobile-header__mainmenu'>
          {mainmenu.items.map((item, i) => (
            <div key={i}>
              <Link
                activeClassName='navbar__anchor navbar__anchor--active'
                to={item.page.url}
              >
                <span className='mb-1' />
                <h1 className='ml-1 mb-2 d-flex justify-content-between'>
                  {item.page.title.text}
                </h1>
              </Link>
              {item.submenu && (
                <div>
                  {item.submenu.items.map(
                    (item, i) =>
                      // we hide the first in submenu on mobile
                      i !== 0 && (
                        <Link
                          key={item.page.url}
                          to={item.page.url}
                          activeClassName='navbar__anchor navbar__anchor--active'
                        >
                          <span className='mb-2' />
                          <p className='ml-1'>{item.page.title.text}</p>
                        </Link>
                      )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileHeader
