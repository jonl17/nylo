import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { useLocation } from '@reach/router'
import cn from 'classnames'

const SecondaryNavBar: React.FC<{ submenuId: string }> = ({ submenuId }) => {
  const data: {
    allSubmenus: {
      nodes: {
        id: string
        data: {
          name: string
          prefix: string
          items: {
            page: {
              uid: string
              document: {
                data: {
                  title: {
                    text: string
                  }
                }
              }
            }
          }[]
        }
      }[]
    }
  } = useStaticQuery(graphql`
    {
      allSubmenus: allPrismicMenu(filter: { tags: { in: ["SUBMENU"] } }) {
        nodes {
          id
          data {
            name
            prefix
            items {
              page {
                uid
                document {
                  ... on PrismicPage {
                    data {
                      title {
                        text
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const allSubmenus = data.allSubmenus.nodes.map(x => {
    return {
      id: x.id,
      title: x.data.name,
      items: x.data.items.map(y => {
        return {
          title: y.page.document.data.title,
          url: `/${x.data.prefix}/${y.page.uid}`,
        }
      }),
    }
  })

  const submenu = allSubmenus.find(menu => menu.id === submenuId)

  const { pathname } = useLocation()

  console.log(submenu)

  if (!submenu) return null

  return (
    <div className="secondary-navbar mt-3 ml-2 d-flex flex-column">
      {submenu.items.map((item, idx) => (
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
