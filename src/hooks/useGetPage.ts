import { graphql, useStaticQuery } from 'gatsby'
import '~/fragments/page'
import { pageResolver } from '~/utils/resolvers'

export default (uid: string) => {
  const data = useStaticQuery(graphql`
    {
      allPrismicPage {
        nodes {
          ...fragmentPrismicPage
        }
      }
    }
  `)
  const page = data.allPrismicPage.nodes.find(
    (node: { uid: string }) => node.uid === uid
  )
  return page ? pageResolver(page) : null
}
