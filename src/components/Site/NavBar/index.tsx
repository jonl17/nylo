import React from "react"
import { Link } from "gatsby"
import useMenuQuery from "./useMenuQuery"
import cn from "classnames"
import styles from "./Navbar.module.scss"
import slugify from "slugify"

const Menu = () => {
  const { mainMenu } = useMenuQuery()
  return (
    <div>
      {mainMenu.map((item, idx) => {
        if (item.page) {
          return (
            <Link
              activeClassName={styles.anchorActive}
              partiallyActive
              key={idx}
              to={`/${item.page.url}`}
              className={styles.anchor}
            >
              <span />
              <h2 className="hdln--1">{item.page.name}</h2>
            </Link>
          )
        } else if (item.submenu) {
          return (
            <Link
              activeClassName={styles.anchorActive}
              partiallyActive
              to={`/${slugify(item.submenu.name, { lower: true })}/${
                item.submenu.items[0].url // default to first item on list | save last chosen item in context?
              }`}
              key={idx}
              className={cn("removeGenericButtonStyles pl-0", styles.anchor)}
            >
              <span />
              <h2 className="hdln--1">{item.submenu.name}</h2>
            </Link>
          )
        }
      })}
    </div>
  )
}

export default () => {
  return (
    <nav className={cn(styles.navbar, "d-flex flex-column pt-3 h-100")}>
      <Menu />
    </nav>
  )
}
