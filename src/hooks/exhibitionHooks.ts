import { graphql, useStaticQuery } from 'gatsby'
import '~/fragments/exhibition/full'
import { Language } from '~/lang'
import { OverViewItem } from '~/types'
import { formatDate } from '~/utils'

const getAllExhibitions = (lang: Language = 'is') => {
  const data: {
    allPrismicExhibition: {
      nodes: {
        id: string
        uid: string
        lang: string
        url: string
        data: {
          opening: string
          closing: string
          featured_image: {
            url: string
            alt: string
          }
          title: {
            text: string
          }
        }
      }[]
    }
  } = useStaticQuery(graphql`
    {
      allPrismicExhibition(sort: { fields: data___opening, order: DESC }) {
        nodes {
          id
          uid
          url
          lang
          ...exhibitionFragmentFull
        }
      }
    }
  `)
  const exhibitions: OverViewItem[] = data.allPrismicExhibition.nodes
    .filter(node => node.lang === lang)
    .map(node => {
      const { id, uid, url, data, lang } = node
      return {
        id,
        uid,
        url,
        lang,
        title: data.title,
        date: formatDate(data.opening, data.closing),
        featuredImage: data.featured_image,
        parentUrl: '/syningar/',
      }
    })
  return exhibitions
}

export { getAllExhibitions }
