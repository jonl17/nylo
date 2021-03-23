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

const pageQuery = `{
  allPrismicPage {
    nodes {
      objectID: url
      data {
        title {
          text
        }
      }
    }
  }
}`

const queries = [
  {
    query: exhibtionQuery,
    transformer: ({ data }) => data.allPrismicExhibition.nodes, // optional
    indexName: 'exhibition', // overrides main index name, optional
  },
  {
    query: pageQuery,
    transformer: ({ data }) => data.allPrismicPage.nodes,
    indexName: 'page',
  },
]

module.exports.queries = queries
