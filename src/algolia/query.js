require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const exhibtionQuery = `{
  ex: allPrismicExhibition {
    nodes {
      type
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
      type
      data {
        title {
          text
        }
      }
    }
  }
  events: allPrismicEvent {
		nodes {
      objectID: id
			type
      url
      data {
				name {
					text
        }
        date
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
          type: node.type,
        }
      })
      const pages = data.pages.nodes.map(node => {
        return {
          objectID: node.objectID,
          url: node.url,
          title: node.data.title.text,
          lang: node.lang,
          type: node.type,
        }
      })
      const events = data.events.nodes.map(node => {
        return {
          objectID: node.objectID,
          url: node.url,
          title: node.data.name.text,
          type: node.type,
          date: node.data.date,
        }
      })

      return [...exhibitions, ...pages, ...events]
    }, // optional
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME, // overrides main index name, optional
  },
]

module.exports.queries = queries
