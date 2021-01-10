import { graphql, useStaticQuery } from 'gatsby'
import { FooterData } from '~/types'

export default () => {
  const data = useStaticQuery(graphql`
    {
      prismicFooter {
        data {
          opening_hours {
            html
          }
          sponsor {
            logo {
              url
              alt
            }
          }
        }
      }
    }
  `)
  const { data: footerItems } = data.prismicFooter
  const footerData: FooterData = {
    openingHours: footerItems.opening_hours,
    sponsors: footerItems.sponsor,
  }
  return footerData
}
