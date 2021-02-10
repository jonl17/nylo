import { graphql, useStaticQuery } from 'gatsby'

export default (id: string) => {
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
              url: string
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
          lang
          data {
            name
            prefix
            items {
              page {
                uid
                url
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
          url: y.page.url,
        }
      }),
    }
  })

  return allSubmenus.find(menu => menu.id === id)
}
