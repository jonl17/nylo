import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { useLocation, Match } from '@reach/router'
import cn from 'classnames'
import { LanguageContext } from '~/context/LanguageContext'
import { MenuItem } from '../NavBar/types'
import useGetSecondaryNavbars from './useGetSecondaryNavbars'

const SecondaryNavBar: React.FC<{
  submenu: { id: string; data: { name: string; items: any[] } }
}> = ({ submenu }) => {
  const menu = useGetSecondaryNavbars(submenu.id)

  const { pathname } = useLocation()

  const { lang } = useContext(LanguageContext)

  console.log(menu)

  if (!menu) return null

  return (
    <div className='secondary-navbar mt-3 ml-2 d-flex flex-column'>
      {menu.items.map((item, idx) => (
        <Link
          className={cn('secondary-navbar__anchor parag--2', {
            ['secondaryAnchorActive']: pathname.includes(item.url),
          })}
          key={idx}
          to={item.url}
        >
          {item.title.text}
        </Link>
      ))}
    </div>
  )
}

export default SecondaryNavBar
