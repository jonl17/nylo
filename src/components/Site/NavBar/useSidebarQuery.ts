import { graphql, useStaticQuery } from 'gatsby'

export default () => {
  const data = useStaticQuery(graphql`
    {
      prismicSidebar {
        data {
          address {
            html
          }
          social_media_links {
            url {
              url
            }
            text
          }
        }
      }
    }
  `)

  if (!data.prismicSidebar) return null

  return {
    address: data.prismicSidebar.data.address,
    socialMediaLinks: data.prismicSidebar.data.social_media_links.map(s => {
      return {
        title: s.text,
        url: s.url.url,
      }
    }),
  }
}
