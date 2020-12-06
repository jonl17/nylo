import React from 'react'
import { Link } from 'gatsby'
import useMenuQuery from './useMenuQuery'
import useSidebarQuery from './useSidebarQuery'

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

const Sidebar = () => {
  const sidebar = useSidebarQuery()
  if (!sidebar) return null
  return (
    <div className="pt-5">
      <div
        className="sidebar__address parag--2"
        dangerouslySetInnerHTML={{ __html: sidebar.address.html }}
      />
      <div className="d-flex flex-column pt-3">
        {sidebar.socialMediaLinks.map(s => (
          <a key={s.url} href={s.url}>
            {s.title}
          </a>
        ))}
      </div>
    </div>
  )
}

export default () => {
  return (
    <nav className="navbar d-flex flex-column pt-3 h-100">
      <Menu />
      <Sidebar />
    </nav>
  )
}
