import { graphql, useStaticQuery } from 'gatsby'

export default () => {
  const data = useStaticQuery(graphql`
    {
      prismicOpeningHours {
        data {
          day_from
          day_to
          time_from
          time_to
        }
      }
    }
  `)

  const { data: op } = data.prismicOpeningHours
  return {
    day: {
      from: op.day_from,
      to: op.day_to,
    },
    time: {
      from: op.time_from,
      to: op.time_to,
    },
  }
}
