import { graphql } from 'gatsby'
import './exhibition/full'

export const fragment = graphql`
  fragment pageRichTextFragment on PrismicPageBodyRichtext {
    slice_type
    primary {
      type
      text {
        html
      }
    }
  }

  fragment pageMediaFragment on PrismicPageBodyMedia {
    slice_type
    items {
      image {
        url
        alt
      }
    }
  }

  fragment pageProgramFragment on PrismicPageBodyProgram {
    slice_type
    primary {
      programName: program_name
    }
    items {
      parameter_label
      parameter_value
    }
  }

  fragment pageCurrentExhibitionFragment on PrismicPageBodyCurrentExhibition {
    slice_type
    primary {
      exhibition {
        document {
          ...exhibitionFragmentFull
        }
      }
    }
  }

  fragment pageUpcomingExhibitionFragment on PrismicPageBodyUpcomingExhibition {
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
