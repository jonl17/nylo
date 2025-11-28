import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment exhibitionFragmentFull on PrismicExhibition {
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
      curator
      opening(formatString: "YYYY-MM-DD")
      closing(formatString: "YYYY-MM-DD")
      featured_image {
        url
        alt
      }
      additional_links {
        text
        link {
          url
        }
      }
      excerpt {
        html
      }
      detailed_text {
        html
      }
      artist_biography {
        html
      }
      exhibition_view {
        image {
          alt
          url
        }
      }
      body {
        ... on PrismicExhibitionDataBodySeo {
          ...seoFragment
        }
      }
    }
  }

  fragment seoFragment on PrismicExhibitionDataBodySeo {
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
