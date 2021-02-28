import React from 'react'
import { Link } from 'gatsby'
import cn from 'classnames'
import { useSecondaryNavbar } from '~/context/secNavContext'
import linkResolver from '~/utils/linkResolver'

const SecondaryNavBar = () => {
  const { menu } = useSecondaryNavbar()

  if (!menu) {
    return null
  }

  return (
    <div className='secondary-navbar mt-3 ml-2 d-none d-lg-flex flex-column'>
      {menu.items.map((item, i) => {
        return (
          <Link
            className={cn('secondary-navbar__anchor parag--2')}
            activeClassName='secondaryAnchorActive'
            key={i}
            to={linkResolver(item.page)}
          >
            {item.page.title.text}
          </Link>
        )
      })}
    </div>
  )
}

export default SecondaryNavBar
