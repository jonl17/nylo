import React from 'react'
import { graphql as gql } from 'gatsby'
import SliceMapping from '~/components/Slices/mapping'
import '~/fragments/news'
import { formatDate } from '~/utils'
import Breadcrumbs from '~/components/Site/Breadcrumbs'
import CloseButton from '~/components/Site/CloseButton'
import FeaturedImage from '~/components/Site/FeaturedImage'
import { newsResolver } from '~/utils/resolvers'
import useGetPage from '~/hooks/useGetPage'
import linkResolver from '~/utils/linkResolver'

const News: React.FC<{
  data: any
}> = ({ data }) => {
  const news = newsResolver(data.prismicNews)

  const homepage = useGetPage(news.lang === 'is' ? 'frettir' : 'news')

  return (
    <div className='page'>
      <div className='content'>
        <CloseButton
          className='icon__exit'
          lang={news.lang}
          isSubpageOf={
            homepage ? { url: homepage.url, uid: homepage.uid } : undefined
          }
        />
        <div className='d-flex align-items-center'>
          <p className='pr-3'>{formatDate(news.date)}</p>
          {homepage && (
            <Breadcrumbs
              parentLink={{
                text: homepage.title.text,
                url: linkResolver(homepage),
              }}
              childLink={{ text: news.title.text, url: `#` }}
            />
          )}
        </div>
        {news.featuredImage.url && <FeaturedImage image={news.featuredImage} />}
        {news.body.map((slice, i) => (
          <SliceMapping key={i} slice={slice} lang={news.lang} />
        ))}
      </div>
    </div>
  )
}

export const query = gql`
  query($id: String, $lang: String) {
    prismicNews(id: { eq: $id }, lang: { eq: $lang }) {
      ...newsFragment
    }
  }
`

export default News
