const path = require('path')
const slugify = require('slugify')

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

  const exhibitions = await graphql(`
    {
      allPrismicExhibition(sort: { fields: data___opening, order: DESC }) {
        nodes {
          id
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

  const pageTemplate = path.resolve(
    __dirname,
    `src/components/templates/Page/Page.tsx`
  )
  const newsTemplate = path.resolve(
    __dirname,
    `src/components/templates/News/News.tsx`
  )

  const exhibitionTemplate = path.resolve(
    __dirname,
    `src/components/templates/Exhibition/Exhibition.tsx`
  )

  // pages
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
  }) +
    // news
    news.data.allPrismicNews.nodes.forEach(node => {
      createPage({
        path: `/frettir/${slugify(node.uid)}`,
        component: newsTemplate,
        context: {
          id: node.id,
          date: node.data.date,
          bg: 'gray',
        },
      })
    })

  // exhibtions
  exhibitions.data.allPrismicExhibition.nodes.forEach(node => {
    createPage({
      path: `/syningar/${slugify(node.uid)}`,
      component: exhibitionTemplate,
      context: {
        id: node.id,
        bg: 'white',
        title: node.data.title,
        uid: node.uid,
      },
    })
  })
}
