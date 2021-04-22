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
      opening(formatString: "YYYY-MM-DD")
      closing(formatString: "YYYY-MM-DD")
      featured_image {
        url
        alt
      }
    }
  }
`
