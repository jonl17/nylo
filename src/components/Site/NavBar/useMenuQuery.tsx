import { useStaticQuery, graphql } from 'gatsby'
import { Menu } from './types'
import '../../../fragments/menu'

const useMenuQuery = () => {
  const menu: Menu = useStaticQuery(graphql`
    {
      prismicMenu(data: { name: { eq: "MAIN_MENU" } }) {
        data {
          items {
            page {
              uid
              document {
                __typename
                ... on PrismicPage {
                  uid
                  data {
                    title {
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  if (!menu.prismicMenu) {
    return null
  }
  const mainMenu = menu.prismicMenu.data.items.map(item => {
    return {
      page: item.page.document
        ? {
            url: item.page.uid,
            name: item.page.document.data.title.text,
          }
        : null,
    }
  })
  return mainMenu
}

export default useMenuQuery
