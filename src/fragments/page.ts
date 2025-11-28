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
        ... on PrismicPageDataBodyProgram {
          ...pageProgramFragment
        }
        ... on PrismicPageDataBodyMedia {
          ...pageMediaFragment
        }
        ... on PrismicPageDataBodyRichtext {
          ...pageRichTextFragment
        }
        ... on PrismicPageDataBodyCurrentExhibition {
          ...pageCurrentExhibitionFragment
        }
        ... on PrismicPageDataBodyUpcomingExhibition {
          ...pageUpcomingExhibitionFragment
        }
        ... on PrismicPageDataBodyTwoColumnText {
          ...twoColumnTextSliceFragment
        }
        ... on PrismicPageDataBodyRedirect {
          ...redirectSliceFragment
        }
      }
    }
  }

  fragment redirectSliceFragment on PrismicPageDataBodyRedirect {
    slice_type
    id
    primary {
      url {
        url
      }
    }
  }

  fragment twoColumnTextSliceFragment on PrismicPageDataBodyTwoColumnText {
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
