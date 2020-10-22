import { useStaticQuery, graphql } from "gatsby"
import { Menu } from "./types"
import "../../../fragments/menu"

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
            submenu {
              document {
                ... on PrismicMenu {
                  ...fragmentPrismicMenu
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
      submenu: item.submenu.document
        ? {
            name: item.submenu.document.data.name,
            items: item.submenu.document.data.items.map(i => {
              return { url: i.page.uid, name: i.page.document.data.title.text }
            }),
          }
        : null,
    }
  })
  return mainMenu
}

export default useMenuQuery
