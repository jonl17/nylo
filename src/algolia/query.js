require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const exhibtionQuery = `{
  ex: allPrismicExhibition {
    nodes {
      objectID: id
      url
      lang
      data {
        title {
          text
        }
        excerpt {
          text
        }
        artist
        curator
      }
    }
  }
  pages: allPrismicPage {
    nodes {
      objectID: id
      url
      lang
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
    transformer: ({ data }) => {
      const exhibitions = data.ex.nodes.map(node => {
        return {
          objectID: node.objectID,
          url: node.url,
          title: node.data.title.text,
          artist: node.data.artist,
          curator: node.data.curator,
          lang: node.lang,
        }
      })
      const pages = data.pages.nodes.map(node => {
        return {
          objectID: node.objectID,
          url: node.url,
          title: node.data.title.text,
          lang: node.lang,
        }
      })

      return [...exhibitions, ...pages]
    }, // optional
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME, // overrides main index name, optional
  },
]

module.exports.queries = queries
