import React from "react"
import { Link } from "gatsby"
import useMenuQuery from "./useMenuQuery"
import cn from "classnames"
import styles from "./Navbar.module.scss"

const Menu = () => {
  const { mainMenu } = useMenuQuery()
  return (
    <div>
      {mainMenu.data.pages.map((item, idx) => (
        <Link
          activeClassName={styles.anchorActive}
          partiallyActive
          key={idx}
          to={`/${item.page.uid}`}
          className={styles.anchor}
        >
          <span />
          <h2 className="heading1">{item.page.document.data.title.text}</h2>
        </Link>
      ))}
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
