const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicPage {
        nodes {
          id
          uid
          tags
          data {
            subpage {
              uid
              document {
                ... on PrismicPage {
                  data {
                    has_submenu {
                      document {
                        ... on PrismicMenu {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
            has_submenu {
              document {
                ... on PrismicMenu {
                  id
                  data {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const news = await graphql(`
    {
      allPrismicNews(sort: { fields: data___date, order: DESC }) {
        nodes {
          id
          uid
          data {
            date
          }
        }
      }
    }
  `)

  const pageTemplate = path.resolve(
    __dirname,
    `src/components/templates/Page/Page.tsx`
  )
  const newsTemplate = path.resolve(
    __dirname,
    `src/components/templates/News/News.tsx`
  )

  pages.data.allPrismicPage.nodes.forEach(node => {
    let path = `/${node.uid}`

    if (node.uid === 'frontpage') {
      path = `/`
    } else if (node.tags.includes('SUB_PAGE') && node.data.subpage.uid) {
      path = `/${node.data.subpage.uid}/${node.uid}`
    }

    const displaySubmenu = () => {
      if (node.data.has_submenu.document) {
        return node.data.has_submenu.document.id
      } else if (node.tags.includes('SUB_PAGE')) {
        if (node.data.subpage.document.data.has_submenu.document) {
          return node.data.subpage.document.data.has_submenu.document.id
        }
      } else {
        return null
      }
    }

    createPage({
      path: path,
      component: pageTemplate,
      context: {
        id: node.id,
        subpageOf: node.data.subpage.uid,
        hasSubmenu: displaySubmenu(),
      },
    })
  })

  news.data.allPrismicNews.nodes.forEach(node => {
    createPage({
      path: `/frettir/${node.uid}`,
      component: newsTemplate,
      context: {
        id: node.id,
        date: node.data.date,
        bg: 'gray',
      },
    })
  })
}
