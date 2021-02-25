import { useStaticQuery, graphql } from 'gatsby'
import { MenuItem } from './types'
import '../../../fragments/menu'
import { menuResolver } from '~/utils/resolvers'

const useMenuQuery = () => {
  const menu: {
    allPrismicMenu: {
      nodes: MenuItem[]
    }
  } = useStaticQuery(graphql`
    {
      allPrismicMenu(filter: { data: { name: { eq: "MAIN_MENU" } } }) {
        nodes {
          ...fragmentPrismicMenu
        }
      }
    }
  `)

  return menu.allPrismicMenu.nodes.map(m => menuResolver(m))
}

export default useMenuQuery
