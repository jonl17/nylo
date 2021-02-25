require('dotenv').config({
  path: `.env`,
})

const {
  prismicRepo,
  accessToken,
  defaultLanguage,
} = require('./prismic.config')

const linkResolver = require('./src/utils/linkResolver')
const { htmlSerializer } = require('./src/prismic/htmlSerializer')

const reponame = process.env.PRISMIC_REPO_NAME || prismicRepo
const apiKey = process.env.PRISMIC_API_KEY || accessToken

// const { htmlSerializer } = require('./src/prismic/htmlSerializer')

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
    },
    lang: '*',
  },
}

module.exports = {
  siteMetadata: {
    title: 'Living Art Museum',
  },
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
  ],
}
