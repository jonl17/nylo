import { graphql as gql, useStaticQuery } from 'gatsby'
import '../fragments/exhibition/excerpt'
import slugify from 'slugify'
import { exhibitionIsOpen } from '~/utils'
import { Language } from '~/lang'

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
  return data.allPrismicExhibition.nodes
    .filter(node => node.lang === lang)
    .find(node => {
      if (
        exhibitionIsOpen(
          new Date(node.data.opening),
          new Date(node.data.closing)
        )
      ) {
        return {
          id: node.id,
          uid: slugify(node.uid),
          url: node.url,
          ...node.data,
        }
      }
    })
}
