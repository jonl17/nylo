import { graphql } from "gatsby"

export const fragment = graphql`
  fragment mediaSliceFragment on PrismicPageBodyMedia {
    items {
      image {
        url
        alt
      }
    }
  }
`
