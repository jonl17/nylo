require('dotenv').config({
  path: `.env.development`,
})

const { htmlSerializer } = require('./src/prismic/htmlSerializer')

const DEFAULT_LANG = 'en-us'

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '~': 'src',
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
          if (doc.type === 'page') {
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
        ) => htmlSerializer(element, content),
        schemas: {
          page: require(`./src/schemas/page.json`),
          menu: require(`./src/schemas/menu.json`),
          news: require(`./src/schemas/news.json`),
          announcement_banner: require(`./src/schemas/announcement_banner.json`),
          exhibition: require(`./src/schemas/exhibition.json`),
          sidebar: require(`./src/schemas/sidebar.json`),
          footer: require(`./src/schemas/footer.json`),
        },
        lang: '*',
        prismicToolbar: true,
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
        },
      },
    },
  ],
}
