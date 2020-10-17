import { graphql, useStaticQuery } from "gatsby"

export default () => {
  const data: {
    prismicAnnouncementBanner: {
      data: {
        the_announcement: {
          html: string
        }
      }
    }
  } = useStaticQuery(graphql`
    {
      prismicAnnouncementBanner {
        data {
          the_announcement {
            html
          }
        }
      }
    }
  `)
  const announcement = data.prismicAnnouncementBanner.data.the_announcement.html
  return { announcement }
}
