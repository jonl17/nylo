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

  const pageTemplate = path.resolve(__dirname, `src/templates/Page/index.tsx`)

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
}
