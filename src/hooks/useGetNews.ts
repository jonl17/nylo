import { graphql, useStaticQuery } from 'gatsby'
import '../fragments/news'
import { NewsInterface, newsResolver } from '~/utils/resolvers'

interface NewsQueryNode {
  id: string
  uid: string
  lang: string
  url: string
  data: {
    featured_image: {
      alt: string
      url: string
    }
    title: {
      text: string
    }
    date: string
  }
}

export default (): NewsInterface[] => {
  const data: {
    allPrismicNews: {
      nodes: NewsQueryNode[]
    }
  } = useStaticQuery(graphql`
    {
      allPrismicNews(sort: { fields: data___date, order: DESC }) {
        nodes {
          ...newsFragment
        }
      }
    }
  `)

  const allNews = data.allPrismicNews.nodes.map(node => newsResolver(node))

  return allNews
}
