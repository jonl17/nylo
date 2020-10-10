import { graphql } from "gatsby"

export const query = graphql`
  fragment fragmentPrismicMenu on PrismicMenu {
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
