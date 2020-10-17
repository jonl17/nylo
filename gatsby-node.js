const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicPage {
        nodes {
          id
          uid
          data {
            subpage {
              uid
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

  const pageTemplate = path.resolve(__dirname, `src/templates/Page/Page.tsx`)
  const newsTemplate = path.resolve(__dirname, `src/templates/News/News.tsx`)

  pages.data.allPrismicPage.nodes.forEach(node => {
    let path = `/${node.uid}`

    if (node.uid === "frontpage") {
      path = `/`
    } else if (node.data.subpage && node.data.subpage.uid) {
      path = `/${node.data.subpage.uid}/${node.uid}`
    }

    createPage({
      path: path,
      component: pageTemplate,
      context: {
        id: node.id,
        parentPageUid: node.data.subpage ? node.data.subpage.uid : null,
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
      },
    })
  })
}
