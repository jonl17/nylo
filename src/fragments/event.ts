import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment eventFragmentFull on PrismicEvent {
    id
    uid
    prismicId
    url
    lang
    type
    data {
      name {
        html
        text
      }
      date(formatString: "YYYY-MM-DD")
      from
      to
      text {
        html
      }
      image {
        alt
        url
        fluid {
          ...GatsbyPrismicImageFluid
        }
      }
    }
  }
`
