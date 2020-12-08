import { graphql as gql, useStaticQuery } from 'gatsby'
import '../fragments/exhibition/excerpt'

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
    const today = new Date().getTime()
    const opening = new Date(node.data.opening).getTime()
    const closing = new Date(node.data.closing).getTime()
    if (today >= opening && today <= closing) {
      return {
        id: node.id,
        uid: node.uid,
        ...node.data,
      }
    }
  })
}
