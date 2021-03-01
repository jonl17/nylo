import { graphql, useStaticQuery } from 'gatsby'
import '~/fragments/menu'
import { MenuInterface, menuResolver } from '~/utils/resolvers'

export default (): MenuInterface[] => {
  const data = useStaticQuery(graphql`
    {
      allPrismicMenu(filter: { tags: { in: "MAIN_MENU" } }) {
        nodes {
          ...fragmentPrismicMenu
        }
      }
    }
  `)
  return data.allPrismicMenu.nodes.map((node: any) => menuResolver(node))
}
