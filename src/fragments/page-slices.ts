import { graphql } from 'gatsby'

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
`
