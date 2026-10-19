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

// Algolia indexing (gatsby-plugin-algolia-search, runs in onPostBuild).
// The indexing key is a server-only env var (no GATSBY_ prefix), so Gatsby
// never inlines it into the browser bundle. The browser uses the separate
// search-only GATSBY_ALGOLIA_SEARCH_KEY (see Search.tsx).
//
// Indexing is enabled when Algolia is configured (GATSBY_ALGOLIA_APP_ID set)
// during `gatsby build`, unless ALGOLIA_SKIP_INDEXING=true. When enabled,
// ALGOLIA_ADMIN_KEY is required and the build fails if it is missing; there is
// no fallback to a GATSBY_ (public) key. Local dev (`gatsby develop`) and
// builds without any Algolia config skip indexing.
const isBuild = process.env.NODE_ENV === 'production'
const algoliaAppId = process.env.GATSBY_ALGOLIA_APP_ID
const algoliaAdminKey = process.env.ALGOLIA_ADMIN_KEY
const skipAlgoliaIndexing = process.env.ALGOLIA_SKIP_INDEXING === 'true'
const algoliaIndexingEnabled =
  isBuild && Boolean(algoliaAppId) && !skipAlgoliaIndexing

if (algoliaIndexingEnabled && !algoliaAdminKey) {
  throw new Error(
    '[algolia] ALGOLIA_ADMIN_KEY is not set, but GATSBY_ALGOLIA_APP_ID is, so ' +
      'the Algolia indexing step would run. Set ALGOLIA_ADMIN_KEY (server-only ' +
      'indexing key, no GATSBY_ prefix) or set ALGOLIA_SKIP_INDEXING=true to ' +
      'build without indexing.'
  )
}

if (isBuild && !algoliaIndexingEnabled && !process.env.GATSBY_WORKER_ID) {
  console.warn(
    `[algolia] Skipping Algolia indexing (${
      skipAlgoliaIndexing
        ? 'ALGOLIA_SKIP_INDEXING=true'
        : 'GATSBY_ALGOLIA_APP_ID not set'
    }).`
  )
}

const algoliaPluginConfig = {
  resolve: `gatsby-plugin-algolia-search`,
  options: {
    appId: algoliaAppId,
    apiKey: algoliaAdminKey,
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME, // for all queries
    queries,
    chunkSize: 10000, // default: 1000
  },
}

const reponame = process.env.PRISMIC_REPO_NAME || prismicRepo
const apiKey = process.env.PRISMIC_API_KEY || accessToken

const gatsbySourcePrismicConfig = {
  resolve: `gatsby-source-prismic`,
  options: {
    repositoryName: reponame ?? '',
    accessToken: apiKey ?? '',
    linkResolver: linkResolver,
    htmlSerializer: htmlSerializer,
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
      '505020dansparty': {},
      form: {},
    },
    lang: '*',
  },
}

module.exports = {
  plugins: [
    gatsbySourcePrismicConfig,
    'gatsby-plugin-layout',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
    ...(algoliaIndexingEnabled ? [algoliaPluginConfig] : []),
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
  ],
}
