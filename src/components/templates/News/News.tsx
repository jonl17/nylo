import React from 'react'
import { graphql as gql } from 'gatsby'
import SliceMapping from '~/components/Slices/mapping'
import '~/fragments/news'
import { Helmet } from 'react-helmet'
import { formatDate } from '~/utils'
import Breadcrumbs from '~/components/Site/Breadcrumbs'
import CloseButton from '~/components/Site/CloseButton'
import FeaturedImage from '~/components/Site/FeaturedImage'
import Layout from '~/layouts'

interface PageContext {
  bg: string
}

const News: React.FC<{
  data: any
}> = ({ data }) => {
  return (
    <Layout pageContext={data.prismicNews} mainMenu={data.prismicMenu}>
      <div className='page'>
        <div className='content'>
          <CloseButton className='icon__exit' />
          <div className='d-flex align-items-center'>
            <p className='pr-3'>{formatDate(data.prismicNews.data.date)}</p>
            <Breadcrumbs
              parentLink={{
                text: 'Fréttir',
                url: '/',
              }}
              childLink={{ text: data.prismicNews.data.title.text, url: `/` }}
            />
          </div>
          {data.prismicNews.data.featured_image.url && (
            <FeaturedImage image={data.prismicNews.data.featured_image} />
          )}
          {data.prismicNews.data.body.map((slice, i) => (
            <SliceMapping key={i} slice={slice} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = gql`
  query($id: String, $lang: String) {
    prismicNews(id: { eq: $id }, lang: { eq: $lang }) {
      ...newsFragment
    }
    prismicMenu(lang: { eq: $lang }, tags: { in: "MAIN_MENU" }) {
      ...fragmentPrismicMenu
    }
  }
`

export default News
