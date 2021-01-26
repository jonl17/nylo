import { graphql, useStaticQuery } from 'gatsby'
import '~/fragments/exhibition/full'
import { OverViewItem } from '~/types'
import { formatDate } from '~/utils'

const getAllExhibitions = () => {
  const data: {
    allPrismicExhibition: {
      nodes: {
        id: string
        uid: string
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
          ...exhibitionFragmentFull
        }
      }
    }
  `)
  const exhibitions: OverViewItem[] = data.allPrismicExhibition.nodes.map(
    node => {
      const { id, uid, data } = node
      return {
        id,
        uid,
        title: data.title,
        date: formatDate(data.opening, data.closing),
        featuredImage: data.featured_image,
        parentUrl: '/syningar/',
      }
    }
  )
  return exhibitions
}

export { getAllExhibitions }
