import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { useLocation, Match } from '@reach/router'
import cn from 'classnames'

const SecondaryNavBar: React.FC<{ submenu: 'um-nylo' }> = ({ submenu }) => {
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
      prefix: x.data.prefix,
      items: x.data.items.map(y => {
        return {
          title: y.page.document.data.title,
          url: `/${x.data.prefix}/${y.page.uid}`,
        }
      }),
    }
  })

  const menu = allSubmenus.find(menu => menu.prefix === submenu)

  const { pathname } = useLocation()

  if (!menu) return null

  return (
    <div className="secondary-navbar mt-3 ml-2 d-flex flex-column">
      <Match path="/um-nylo">
        {props => (
          <Link
            className={cn('secondary-navbar__anchor parag--2', {
              ['secondaryAnchorActive']: props.match,
            })}
            to="/um-nylo"
          >
            Um safnið
          </Link>
        )}
      </Match>
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
