import React from 'react'
import { Link } from 'gatsby'
import useMenuQuery from './useMenuQuery'

const Menu = () => {
  const mainMenu = useMenuQuery()
  return (
    <div>
      {mainMenu &&
        mainMenu.map(
          (item, idx) =>
            item.page && (
              <Link
                activeClassName="navbar__anchor--active"
                partiallyActive
                key={idx}
                to={`/${item.page.url}`}
                className="navbar__anchor"
              >
                <span />
                <h1>{item.page.name}</h1>
              </Link>
            )
        )}
    </div>
  )
}

export default () => {
  return (
    <nav className="navbar d-flex flex-column pt-3 h-100">
      <Menu />
    </nav>
  )
}
