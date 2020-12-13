import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment exhibitionFragmentFull on PrismicExhibition {
    data {
      title {
        text
      }
      artist
      curator
      opening
      closing
      featured_image {
        url
        alt
      }
      body {
        ... on PrismicExhibitionBodyRichtext {
          slice_type
          primary {
            text {
              html
            }
          }
        }
        ... on PrismicExhibitionBodyMedia {
          slice_type
          items {
            image {
              url
              alt
            }
          }
        }
      }
    }
  }
`
