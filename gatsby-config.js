require("dotenv").config({
  path: `.env.development`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "~": "src",
        },
        extensions: [`ts`, `tsx`],
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        accessToken: process.env.GATSBY_PRISMIC_ACCESS_TOKEN,
        linkResolver: ({ node, key, value }) => doc => {
          if (doc.type === "page") {
            return `/${doc.id}`
          }
          return `/`
        },
        fetchLinks: [
          // Your list of links
        ],
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children
        ) => {
          // Your HTML serializer
        },
        schemas: {
          page: require(`./src/schemas/page.json`),
          menu: require(`./src/schemas/menu.json`),
        },
        lang: "*",
        prismicToolbar: true,
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
        },
      },
    },
  ],
}
