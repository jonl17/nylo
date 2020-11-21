import React from "react"
import { Link } from "gatsby"
import useMenuQuery from "./useMenuQuery"
import cn from "classnames"
import slugify from "slugify"
import { useLocation } from "@reach/router"

const Menu = () => {
  const mainMenu = useMenuQuery()
  const { pathname } = useLocation()
  return (
    <div>
      {mainMenu &&
        mainMenu.map((item, idx) => {
          if (item.page) {
            return (
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
          } else if (item.submenu) {
            const inSlugForm = (name: string) => {
              return `/${slugify(name, { lower: true })}/`
            }
            return (
              <Link
                to={`${inSlugForm(item.submenu.name)}${
                  item.submenu.items[0].url // default to first item on list | save last chosen item in context?
                }`}
                key={idx}
                className={cn("navbar__anchor removeGenericButtonStyles pl-0", {
                  "navbar__anchor--active": pathname.includes(
                    inSlugForm(item.submenu.name)
                  ),
                })}
              >
                <span />
                <h1>{item.submenu.name}</h1>
              </Link>
            )
          }
        })}
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
