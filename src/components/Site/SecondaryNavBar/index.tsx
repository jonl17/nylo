import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { useLocation } from "@reach/router"
import cn from "classnames"
import styles from "./SecondaryNavBar.module.scss"

const SecondaryNavBar: React.FC<{ parentPageUid: string }> = ({
  parentPageUid,
}) => {
  const data: {
    allPrismicPage: {
      nodes: { uid: string; data: { title: { text: string } } }[]
    }
  } = useStaticQuery(graphql`
    {
      allPrismicPage(
        filter: { data: { subpage: { uid: { eq: "um-nylo" } } } }
      ) {
        nodes {
          uid
          data {
            title {
              text
            }
          }
        }
      }
    }
  `)

  const { pathname } = useLocation()

  return (
    <div className={cn(styles.menuWrap, "mt-3 ml-2 d-flex flex-column")}>
      {data.allPrismicPage.nodes.map((item, idx) => (
        <Link
          className={cn("parag--2", styles.anchor, {
            [styles.activeItem]: `/${parentPageUid}/${item.uid}` === pathname,
          })}
          key={idx}
          to={`/${parentPageUid}/${item.uid}`}
        >
          {item.data.title.text}
        </Link>
      ))}
    </div>
  )
}

export default SecondaryNavBar
