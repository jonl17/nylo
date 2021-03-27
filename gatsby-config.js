require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const {
  prismicRepo,
  accessToken,
  defaultLanguage,
} = require('./prismic.config')

const linkResolver = require('./src/utils/linkResolver')
const { htmlSerializer } = require('./src/prismic/htmlSerializer')

const { queries } = require('./src/algolia/query')

const reponame = process.env.PRISMIC_REPO_NAME || prismicRepo
const apiKey = process.env.PRISMIC_API_KEY || accessToken

const gatsbySourcePrismicConfig = {
  resolve: `gatsby-source-prismic`,
  options: {
    repositoryName: reponame,
    accessToken: apiKey,
    linkResolver: () => doc => linkResolver(doc),
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
      event: require('./src/schemas/event.json'),
      seo: require('./src/schemas/seo.json'),
    },
    lang: '*',
  },
}

module.exports = {
  plugins: [
    gatsbySourcePrismicConfig,
    'gatsby-plugin-layout',
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
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
      resolve: `gatsby-plugin-algolia-search`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
