import { graphql, useStaticQuery } from 'gatsby'
import { NewsItem } from '~/types'
import '../fragments/news'

interface NewsQueryNode {
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
  }
}

const getAllNews = () => {
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
  const allNews: NewsItem[] = data.allPrismicNews.nodes.map(node => {
    return {
      id: node.id,
      uid: node.uid,
      featuredImage: node.data.featured_image,
      ...node.data,
    }
  })
  return allNews
}

const getLatestNews = (news: NewsItem[] = getAllNews()) => news[0]

export { getAllNews, getLatestNews }