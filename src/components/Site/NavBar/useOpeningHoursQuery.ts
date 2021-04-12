import { graphql, useStaticQuery } from 'gatsby'
import { openingHourResolver } from '~/utils/resolvers'

export default () => {
  const data = useStaticQuery(graphql`
    {
      prismicSeo {
        data {
          active_opening_hours {
            document {
              ... on PrismicOpeningHours {
                data {
                  day_from
                  day_to
                  time_from
                  time_to
                }
              }
            }
          }
        }
      }
    }
  `)

  return openingHourResolver(data.prismicSeo)
}
