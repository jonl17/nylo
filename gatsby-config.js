require('dotenv').config({
  path: `.env.development`,
})

const { htmlSerializer } = require('./src/prismic/htmlSerializer')
const getLinkResolver = require('./src/utils/getLinkResolver')

const DEFAULT_LANG = 'is'

const linkResolver = getLinkResolver(DEFAULT_LANG, 'FRONTPAGE')

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
        linkResolver: () => linkResolver,
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
          opening_hours: require(`./src/schemas/opening_hours.json`),
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
