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
          lang
          url
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
          lang
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
          lang
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
    const displaySubmenu = () => {
      if (node.data.has_submenu.document) {
        return node.data.has_submenu.document.id
      } else return null
    }

    createPage({
      path: node.url,
      component: pageTemplate,
      context: {
        id: node.id,
        subpageOf: node.data.subpage.uid,
        hasSubmenu: displaySubmenu(),
        uid: node.uid,
        lang: node.lang,
        url: node.url,
      },
    })
  })
  // news
  news.data.allPrismicNews.nodes.forEach(node => {
    createPage({
      path: `/frettir/${slugify(node.uid)}`,
      component: newsTemplate,
      context: {
        id: node.id,
        date: node.data.date,
        uid: node.uid,
        lang: node.lang,
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
        title: node.data.title,
        uid: node.uid,
        lang: node.lang,
      },
    })
  })
}
