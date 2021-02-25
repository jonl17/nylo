import { graphql, useStaticQuery } from 'gatsby'
import { Language } from '~/lang'

export default () => {
  const data: {
    allPrismicAnnouncementBanner: {
      nodes: {
        lang: string
        data: {
          the_announcement: {
            html: string
          }
        }
      }[]
    }
  } = useStaticQuery(graphql`
    {
      allPrismicAnnouncementBanner {
        nodes {
          lang
          data {
            the_announcement {
              html
            }
          }
        }
      }
    }
  `)
  return data.allPrismicAnnouncementBanner.nodes.map(node => {
    return {
      lang: node.lang,
      announcement: node.data.the_announcement,
    }
  })
}
