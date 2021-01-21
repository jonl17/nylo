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
  if (!data.allPrismicAnnouncementBanner) {
    return null
  }
  const announcement: { [key in Language]: any } = {
    is: data.allPrismicAnnouncementBanner.nodes.find(
      node => node.lang === 'is'
    ),
    'en-us': data.allPrismicAnnouncementBanner.nodes.find(
      node => node.lang === 'en-us'
    ),
  }
  return announcement
}
