import { graphql, useStaticQuery } from 'gatsby'
import { NewsItem } from '~/types'
import '../fragments/news'
import slugify from 'slugify'

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
      uid: slugify(node.uid),
      featuredImage: node.data.featured_image,
      ...node.data,
    }
  })
  return allNews
}

const getLatestNews = (news: NewsItem[] = getAllNews()) =>
  // if there are more than 2 available, bring 'em. Otherwise bring 1.
  news.length > 1 ? news.slice(0, 2) : news.slice(0, 1)

export { getAllNews, getLatestNews }
