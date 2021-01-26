import { graphql as gql, useStaticQuery } from 'gatsby'
import '../fragments/exhibition/excerpt'
import slugify from 'slugify'
import { exhibitionIsOpen } from '~/utils'
import { Language } from '~/lang'

export default () => {
  const data: {
    allPrismicExhibition: {
      nodes: {
        id: string
        uid: string
        data: {
          title: {
            text: string
          }
          artist: string
          opening: string
          closing: string
          featured_image: {
            alt: string
            url: string
          }
        }
      }[]
    }
  } = useStaticQuery(gql`
    {
      allPrismicExhibition {
        nodes {
          id
          uid
          ...exhibitionExcerpt
        }
      }
    }
  `)
  return data.allPrismicExhibition.nodes.find(node => {
    if (
      exhibitionIsOpen(new Date(node.data.opening), new Date(node.data.closing))
    ) {
      return {
        id: node.id,
        uid: slugify(node.uid),
        ...node.data,
      }
    }
  })
}
