import { graphql, useStaticQuery } from 'gatsby'
import { OverViewItem } from '~/types'
import '../fragments/news'
import slugify from 'slugify'
import { formatDate } from '~/utils'
import { Language } from '~/lang'
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

  const allNews = data.allPrismicNews.nodes.map(node => newsResolver(node))

  return allNews
}

const getLatestNews = (
  lang: Language = 'is',
  news: NewsInterface[] = getAllNews()
) =>
  // if there are more than 2 available, bring 'em. Otherwise bring 1.
  news.length > 1 ? news.slice(0, 2) : news.slice(0, 1)

export { getAllNews, getLatestNews }
