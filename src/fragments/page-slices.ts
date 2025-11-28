import { graphql } from 'gatsby'
import './exhibition/full'

export const fragment = graphql`
  fragment pageRichTextFragment on PrismicPageDataBodyRichtext {
    slice_type
    primary {
      type
      text {
        html
      }
    }
  }

  fragment pageMediaFragment on PrismicPageDataBodyMedia {
    slice_type
    items {
      image {
        url
        alt
      }
    }
  }

  fragment pageProgramFragment on PrismicPageDataBodyProgram {
    slice_type
    primary {
      programName: program_name
    }
    items {
      parameter_label
      parameter_value
    }
  }

  fragment pageCurrentExhibitionFragment on PrismicPageDataBodyCurrentExhibition {
    slice_type
    primary {
      exhibition {
        document {
          ...exhibitionFragmentFull
        }
      }
    }
  }

  fragment pageUpcomingExhibitionFragment on PrismicPageDataBodyUpcomingExhibition {
    slice_type
    primary {
      upcoming_exhibition {
        document {
          ...exhibitionFragmentFull
        }
      }
    }
  }
`
