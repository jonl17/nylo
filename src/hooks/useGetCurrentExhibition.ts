import { graphql as gql, useStaticQuery } from 'gatsby'
import '../fragments/exhibition/excerpt'
import slugify from 'slugify'
import { exhibitionIsOpen } from '~/utils'
import { Language } from '~/lang'
import { ExhibitionInterface, exhibitionResolver } from '~/utils/resolvers'

export default (lang: Language = 'is') => {
  const data: {
    allPrismicExhibition: {
      nodes: {
        id: string
        uid: string
        lang: string
        url: string
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
          lang
          url
          ...exhibitionExcerpt
        }
      }
    }
  `)

  const current = data.allPrismicExhibition.nodes.filter(node =>
    exhibitionIsOpen(new Date(node.data.opening), new Date(node.data.closing))
  )
  if (!current) return null
  return exhibitionResolver(current)
}
