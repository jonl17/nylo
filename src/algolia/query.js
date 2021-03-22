require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const exhibtionQuery = `{
  allPrismicExhibition {
    nodes {
      objectID: url
      data {
        title {
          text
        }
        excerpt {
          html
        }
        artist
        curator
      }
    }
  }
}`

const queries = [
  {
    query: exhibtionQuery,
    transformer: ({ data }) => data.allPrismicExhibition.nodes, // optional
    indexName: process.env.ALGOLIA_INDEX_NAME, // overrides main index name, optional
  },
]

module.exports.queries = queries
