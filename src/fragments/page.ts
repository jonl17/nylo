import { graphql } from 'gatsby'
import './news'
import './page-slices'
import './menu'

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
      is_subpage_of {
        document {
          ... on PrismicPage {
            url
            uid
          }
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
        ... on PrismicPageBodyUpcomingExhibition {
          ...pageUpcomingExhibitionFragment
        }
        ... on PrismicPageBodyTwoColumnText {
          ...twoColumnTextSliceFragment
        }
      }
    }
  }

  fragment twoColumnTextSliceFragment on PrismicPageBodyTwoColumnText {
    slice_type
    id
    primary {
      first_column {
        html
      }
      second_column {
        html
      }
    }
  }

  fragment parentPageFragment on PrismicPage {
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
      is_subpage_of {
        document {
          ... on PrismicPage {
            url
            uid
          }
        }
      }
    }
  }
`
