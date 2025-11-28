const path = require('path')
const slugify = require('slugify')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
      },
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicPage {
        nodes {
          url
          id
          prismicId
          uid
          lang
          tags
          type
          alternate_languages {
            document {
              ... on PrismicPage {
                id
                uid
                tags
                url
                lang
              }
            }
          }
          data {
            title {
              html
              text
            }
            is_subpage_of {
              document {
                ... on PrismicPage {
                  uid
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
      allPrismicNews(sort: {data: {date: DESC}}) {
        nodes {
          id
          uid
          lang
          tags
          url
          type
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
                type
              }
            }
          }
        }
      }
    }
  `)

  const exhibitions = await graphql(`
    {
      allPrismicExhibition(sort: {data: {opening: DESC}}) {
        nodes {
          id
          uid
          lang
          prismicId
          url
          type
          tags
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

  const events = await graphql(`
    {
      allPrismicEvent(sort: {data: {date: DESC}}) {
        nodes {
          id
          uid
          url
          lang
          prismicId
          tags
          type
          alternate_languages {
            document {
              ... on PrismicEvent {
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

  const eventTemplate = path.resolve(
    __dirname,
    'src/components/templates/Event/Event.tsx'
  )

  // pages
  pages.data.allPrismicPage.nodes.forEach(node => {
    createPage({
      path: node.url,
      component: pageTemplate,
      context: {
        ...node,
        bg: node.tags.find(tag => tag.includes('bg-')),
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
        bg: 'bg-purple',
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
        bg: 'bg-gray',
      },
    })
  })

  // events
  events.data.allPrismicEvent.nodes.forEach(node => {
    createPage({
      path: node.url,
      component: eventTemplate,
      context: {
        ...node,
      },
    })
  })
}
