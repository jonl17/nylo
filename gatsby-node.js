const path = require('path')
const slugify = require('slugify')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
    },
  })
}

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
          alternate_languages {
            document {
              ... on PrismicPage {
                id
                uid
                tags
                lang
                url
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
          url
          data {
            date
          }
          alternate_languages {
            document {
              ... on PrismicNews {
                id
                uid
                tags
                lang
                url
              }
            }
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
          url
          alternate_languages {
            document {
              ... on PrismicExhibition {
                id
                uid
                tags
                lang
                url
              }
            }
          }
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
        return node.data.has_submenu.document.data.name
      } else return null
    }

    createPage({
      path: node.url,
      component: pageTemplate,
      context: {
        hasSubmenu: displaySubmenu(),
        ...node,
      },
    })
  })
  // news
  news.data.allPrismicNews.nodes.forEach(node => {
    createPage({
      path: node.url,
      component: newsTemplate,
      context: {
        ...node,
        date: node.data.date,
        type: 'news',
      },
    })
  })

  // exhibtions
  exhibitions.data.allPrismicExhibition.nodes.forEach(node => {
    createPage({
      path: node.url,
      component: exhibitionTemplate,
      context: {
        ...node,
        type: 'exhibition',
      },
    })
  })
}
