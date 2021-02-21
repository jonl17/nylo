import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment fragmentPrismicMenu on PrismicMenu {
    id
    data {
      name
      items {
        page {
          uid
          url
          lang
          document {
            ... on PrismicPage {
              alternate_languages {
                document {
                  ... on PrismicPage {
                    url
                  }
                }
              }
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
