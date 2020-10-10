import { graphql, useStaticQuery } from "gatsby"

export default () => {
  const data: {
    prismicAnnouncementBanner: {
      data: {
        the_announcement: {
          text: string
        }[]
      }
    }
  } = useStaticQuery(graphql`
    {
      prismicAnnouncementBanner {
        data {
          the_announcement {
            text
          }
        }
      }
    }
  `)
  const announcement =
    data.prismicAnnouncementBanner.data.the_announcement[0].text
  return { announcement }
}
