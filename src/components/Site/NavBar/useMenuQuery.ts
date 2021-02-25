import { useStaticQuery, graphql } from 'gatsby'
import { MenuItem } from './types'
import '../../../fragments/menu'
import { Language } from '~/lang'
import { pageResolver } from '~/utils/resolvers'

const useMenuQuery = (lang: Language = 'is') => {
  const menu: {
    allPrismicMenu: {
      nodes: MenuItem[]
    }
  } = useStaticQuery(graphql`
    {
      allPrismicMenu(filter: { data: { name: { eq: "MAIN_MENU" } } }) {
        nodes {
          lang
          data {
            items {
              page {
                uid
                url
                document {
                  __typename
                  ... on PrismicPage {
                    alternate_languages {
                      document {
                        ... on PrismicPage {
                          url
                        }
                      }
                    }
                    uid
                    url
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
    }
  `)

  if (!!!menu.allPrismicMenu.nodes.length) {
    return null
  }

  const translatedMainMenu = menu.allPrismicMenu.nodes.find(
    node => node.lang === lang
  )

  const mainMenu = translatedMainMenu?.data.items.map(item => {
    return {
      page: item.page.document && pageResolver(item.page.document),
    }
  })
  return mainMenu
}

export default useMenuQuery
