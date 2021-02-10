import { graphql, useStaticQuery } from 'gatsby'
import { OverViewItem } from '~/types'
import '../fragments/news'
import slugify from 'slugify'
import { formatDate } from '~/utils'
import { Language } from '~/lang'

interface NewsQueryNode {
  id: string
  uid: string
  lang: string
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
  const allNews: OverViewItem[] = data.allPrismicNews.nodes.map(node => {
    return {
      id: node.id,
      uid: slugify(node.uid),
      lang: node.lang,
      featuredImage: node.data.featured_image,
      title: node.data.title,
      date: formatDate(node.data.date),
      parentUrl: '/frettir/',
    }
  })
  return allNews
}

const getLatestNews = (
  lang: Language = 'is',
  news: OverViewItem[] = getAllNews(lang)
) =>
  // if there are more than 2 available, bring 'em. Otherwise bring 1.
  news.length > 1 ? news.slice(0, 2) : news.slice(0, 1)

export { getAllNews, getLatestNews }
