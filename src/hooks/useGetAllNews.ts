import { graphql, useStaticQuery } from "gatsby"
import { NewsItem } from "~/types"

export default () => {
  const data: {
    allPrismicNews: {
      nodes: {
        id: string
        uid: string
        data: {
          featured_image: {
            alt: string
            url: string
          }
          title: {
            text: string
          }
          date: string
          content: {
            html: string
          }
        }
      }[]
    }
  } = useStaticQuery(graphql`
    {
      allPrismicNews(sort: { fields: data___date, order: DESC }) {
        nodes {
          id
          uid
          data {
            featured_image {
              alt
              url
            }
            title {
              text
            }
            date
            content {
              html
            }
          }
        }
      }
    }
  `)
  const allNews: NewsItem[] = data.allPrismicNews.nodes.map(node => {
    return {
      id: node.id,
      uid: node.uid,
      title: node.data.title,
      date: node.data.date,
      content: node.data.content,
      featuredImage: node.data.featured_image,
    }
  })
  return { allNews }
}
