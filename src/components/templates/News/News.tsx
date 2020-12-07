import React from 'react'
import { PageProps, graphql as gql } from 'gatsby'
import { NewsItem, NewsQuery } from '~/types'
import SliceMapping from '~/components/Slices/mapping'
import { useLocation } from '@reach/router'
import '~/fragments/news'

const News: React.FC<{ pageContext: PageProps; data: NewsQuery }> = ({
  data,
  pageContext,
}) => {
  const news: NewsItem = {
    id: data.prismicNews.id,
    uid: data.prismicNews.uid,
    title: data.prismicNews.data.title,
    date: data.prismicNews.data.date,
    featuredImage: data.prismicNews.data.featured_image,
  }
  const { pathname } = useLocation()

  return (
    <div className={`page bg--${pageContext.bg}`}>
      <div className='content'>
        <p>{news.date}</p>
        {data.prismicNews.data.body.map((slice, i) => (
          <SliceMapping key={i} slice={slice} />
        ))}
      </div>
    </div>
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
