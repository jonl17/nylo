import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment newsFragment on PrismicNews {
    id
    uid
    data {
      featured_image {
        alt
        url
      }
      title {
        text
      }
      date
    }
  }
`
