import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment exhibitionExcerpt on PrismicExhibition {
    data {
      title {
        text
      }
      artist
      opening
      closing
      featured_image {
        url
        alt
      }
    }
  }
`
