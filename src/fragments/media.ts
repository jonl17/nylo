import { graphql } from "gatsby"

export const fragment = graphql`
  fragment mediaSliceFragment on PrismicPageDataBodyMedia {
    items {
      image {
        url
        alt
      }
    }
  }
`
