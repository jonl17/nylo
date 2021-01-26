import React from 'react'
import { PageProps, graphql as gql } from 'gatsby'
import { NewsItem, NewsQuery } from '~/types'
import SliceMapping from '~/components/Slices/mapping'
import '~/fragments/news'
import { Helmet } from 'react-helmet'
import { formatDate } from '~/utils'
import Breadcrumbs from '~/components/Site/Breadcrumbs'
import CloseButton from '~/components/Site/CloseButton'
import FeaturedImage from '~/components/Site/FeaturedImage'

interface PageContext {
  bg: string
}

const News: React.FC<{
  pageContext: PageProps & PageContext
  data: NewsQuery
}> = ({ data, pageContext }) => {
  const news: NewsItem = {
    id: data.prismicNews.id,
    uid: data.prismicNews.uid,
    title: data.prismicNews.data.title,
    date: data.prismicNews.data.date,
    featuredImage: data.prismicNews.data.featured_image,
  }

  return (
    <>
      <Helmet>
        <title>Living Art Museum—Fréttir</title>
      </Helmet>
      <div className={`page bg--${pageContext.bg}`}>
        <div className='content'>
          <CloseButton className='icon__exit' />
          <div className='d-flex align-items-center'>
            <p className='pr-3'>{formatDate(news.date)}</p>
            <Breadcrumbs
              parentLink={{ text: 'Fréttir', url: '/frettir' }}
              childLink={{ text: news.title.text, url: `/frettir/${news.uid}` }}
            />
          </div>
          {news.featuredImage.url && (
            <FeaturedImage image={news.featuredImage} />
          )}
          {data.prismicNews.data.body.map((slice, i) => (
            <SliceMapping key={i} slice={slice} />
          ))}
        </div>
      </div>
    </>
  )
}

export const query = gql`
  query($id: String!) {
    prismicNews(id: { eq: $id }) {
      ...newsFragment
    }
  }
`

export default News
