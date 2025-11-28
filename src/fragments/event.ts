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
        gatsbyImageData
      }
      body {
        ... on PrismicEventDataBodySeo {
          ...seoFragmentEvents
        }
        ... on PrismicEventDataBodyRichtext {
          ...richTextFragmentEvents
        }
      }
    }
  }

  fragment richTextFragmentEvents on PrismicEventDataBodyRichtext {
    slice_type
    id
    primary {
      text {
        html
      }
    }
  }

  fragment seoFragmentEvents on PrismicEventDataBodySeo {
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
