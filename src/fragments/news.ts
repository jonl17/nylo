import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment newsFragment on PrismicNews {
    id
    uid
    lang
    url
    alternate_languages {
      id
      type
      lang
      uid
      url
    }
    data {
      featured_image {
        alt
        url
      }
      title {
        text
      }
      date
      body {
        ... on PrismicNewsBodyMedia {
          slice_type
          items {
            image {
              url
              alt
            }
          }
        }
        ... on PrismicNewsBodyRichtext {
          slice_type
          primary {
            text {
              html
            }
          }
        }
      }
    }
  }
`
