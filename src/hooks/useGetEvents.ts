import { graphql, useStaticQuery } from 'gatsby'
import '~/fragments/event'
import { EventInterface, eventResolver } from '~/utils/resolvers'

export default (): EventInterface[] => {
  const data = useStaticQuery(graphql`
    {
      allPrismicEvent(sort: { fields: data___date, order: DESC }) {
        nodes {
          ...eventFragmentFull
        }
      }
    }
  `)

  return data.allPrismicEvent.nodes.map((node: any) => eventResolver(node))
}
