import { graphql, useStaticQuery } from 'gatsby'
import '~/fragments/exhibition/full'

export default () => {
  const data: {
    allPrismicExhibition: {
      nodes: {
        id: string
        data: {
          artist: string
          curator: string
          opening: string
          closing: string
          featured_image: {
            url: string
            alt: string
          }
          title: {
            text: string
          }
          body: any[]
        }
      }[]
    }
  } = useStaticQuery(graphql`
    {
      allPrismicExhibition {
        nodes {
          id
          ...exhibitionFragmentFull
        }
      }
    }
  `)
  const exhibitions = data.allPrismicExhibition.nodes.map(node => {
    const { id, data } = node
    return {
      id,
      title: data.title,
      artist: data.artist,
      curator: data.curator,
      date: {
        opening: data.opening,
        closing: data.closing,
      },
      featuredImage: data.featured_image,
      body: data.body,
    }
  })
  return exhibitions
}
