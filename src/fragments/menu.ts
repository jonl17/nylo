import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment fragmentPrismicMenu on PrismicMenu {
    id
    data {
      name
      items {
        page {
          uid
          document {
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
`
