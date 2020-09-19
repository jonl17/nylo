import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Menu } from './types'

const useMenuQuery = () => {
  const menu: Menu = useStaticQuery(graphql`
  {
    prismicMenu(uid: {eq: "main_menu"}) {
      uid
      data {
        pages {
          page {
            uid
            document {
              __typename
              ... on PrismicPage {
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
  return { mainMenu: menu.prismicMenu }
}

export default useMenuQuery
