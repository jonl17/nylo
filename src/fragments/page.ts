import { graphql } from 'gatsby'
import './news'
import './page-slices'

export const fragment = graphql`
  fragment fragmentPrismicPage on PrismicPage {
    url
    id
    prismicId
    uid
    lang
    tags
    alternate_languages {
      document {
        ... on PrismicPage {
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
        html
        text
      }
      has_submenu {
        document {
          ...fragmentPrismicMenu
        }
      }
      body {
        ... on PrismicPageBodyProgram {
          ...pageProgramFragment
        }
        ... on PrismicPageBodyMedia {
          ...pageMediaFragment
        }
        ... on PrismicPageBodyRichtext {
          ...pageRichTextFragment
        }
        ... on PrismicPageBodyCurrentExhibition {
          ...pageCurrentExhibitionFragment
        }
      }
    }
  }
`
