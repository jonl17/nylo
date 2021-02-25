import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment exhibitionExcerpt on PrismicExhibition {
    url
    id
    prismicId
    uid
    lang
    tags
    alternate_languages {
      document {
        ... on PrismicExhibition {
          id
          uid
          tags
          url
          lang
        }
      }
    }
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
