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
      body {
        ... on PrismicEventBodySeo {
          ...seoFragmentEvents
        }
        ... on PrismicEventBodyRichtext {
          ...richTextFragmentEvents
        }
      }
    }
  }

  fragment richTextFragmentEvents on PrismicEventBodyRichtext {
    slice_type
    id
    primary {
      text {
        html
      }
    }
  }

  fragment seoFragmentEvents on PrismicEventBodySeo {
    slice_type
    id
    primary {
      override_title
      override_description
      override_keywords
      override_image {
        url
      }
    }
  }
`
