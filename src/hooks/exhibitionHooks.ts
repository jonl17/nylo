import { graphql, useStaticQuery } from 'gatsby'
import '~/fragments/exhibition/full'
import { Language } from '~/lang'
import { ExhibitionInterface, exhibitionResolver } from '~/utils/resolvers'

const getAllExhibitions = () => {
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
          ...exhibitionFragmentFull
        }
      }
    }
  `)
  const exhibitions: ExhibitionInterface[] = data.allPrismicExhibition.nodes.map(
    node => exhibitionResolver(node)
  )

  return exhibitions
}
export { getAllExhibitions }
