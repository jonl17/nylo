import { graphql } from 'gatsby'
import './page'

export const fragment = graphql`
  fragment fragmentPrismicMenu on PrismicMenu {
    id
    prismicId
    lang
    tags
    data {
      name
      items {
        page {
          uid
          url
          lang
          tags
          document {
            ... on PrismicPage {
              ...menuPageFragment
            }
          }
        }
        submenu {
          document {
            ... on PrismicMenu {
              id
              prismicId
              lang
              tags
              data {
                name
                items {
                  page {
                    uid
                    url
                    lang
                    tags
                    document {
                      ... on PrismicPage {
                        ...menuPageFragment
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment menuPageFragment on PrismicPage {
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
          ... on PrismicMenu {
            id
            prismicId
            lang
            tags
            data {
              name
              items {
                page {
                  uid
                  url
                  lang
                  tags
                }
              }
            }
          }
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
