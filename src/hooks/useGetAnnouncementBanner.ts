import { graphql, useStaticQuery } from 'gatsby'

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
  const announcement: { [key in 'is' | 'en']: any } = {
    is: data.allPrismicAnnouncementBanner.nodes.find(
      node => node.lang === 'is'
    ),
    en: data.allPrismicAnnouncementBanner.nodes.find(
      node => node.lang === 'en-us'
    ),
  }
  return announcement
}
