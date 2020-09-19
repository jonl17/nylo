const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicPage {
        nodes {
          id
          uid
        }
      }
    }
  `)

  const pageTemplate = path.resolve(__dirname, `src/templates/Page/index.tsx`)

  pages.data.allPrismicPage.nodes.forEach(node => {
    createPage({
      path: node.uid === "frontpage" ? `/` : `/${node.uid}`,
      component: pageTemplate,
      context: {
        id: node.id,
      },
    })
  })
}
