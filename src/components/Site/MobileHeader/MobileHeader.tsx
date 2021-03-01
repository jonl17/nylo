import { Link } from 'gatsby'
import React, { useState } from 'react'
import Burger from '~/components/Site/Burger'
import { Language } from '~/lang'
import cn from 'classnames'
import useGetMainMenu from '~/hooks/useGetMainMenu'

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
  const [expand, setExpand] = useState(false)

  const mainmenu = useGetMainMenu().find(node => node.lang === lang)

  return (
    <div
      className={cn('mobile-header d-block d-lg-none', {
        'mobile-header--expanded': expand,
        [`${bg}`]: !expand,
      })}
    >
      <div className={cn('d-flex justify-content-between mobile-header__head')}>
        <Burger onClick={() => setExpand(!expand)} expand={expand} />
        <Title lang={lang} />
      </div>
      {mainmenu && (
        <div className='mobile-header__mainmenu'>
          {mainmenu.items.map(item => (
            <Link
              activeClassName='navbar__anchor navbar__anchor--active'
              onClick={() => setExpand(false)}
              key={item.page.url}
              to={item.page.url}
            >
              <span />
              <h1 className='mb-2'>{item.page.title.text}</h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileHeader
