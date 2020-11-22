import React from "react"
import { SecondaryNavBar } from "~/components/Site/SecondaryNavBar"
import { PageProps, graphql as gql } from "gatsby"
import { NewsItem, NewsQuery } from "~/types"
import SliceMapping from "~/components/Slices/mapping"

const News: React.FC<{ pageContext: PageProps; data: NewsQuery }> = ({
  data,
}) => {
  const news: NewsItem = {
    id: data.prismicNews.id,
    uid: data.prismicNews.uid,
    title: data.prismicNews.data.title,
    date: data.prismicNews.data.date,
    featuredImage: data.prismicNews.data.featured_image,
  }
  console.log(data.prismicNews.data.body)
  return (
    <div className="page bg--green">
      <SecondaryNavBar parentPageUid="um-nylo" />
      <div className="content">
        <p>{news.date}</p>
        {data.prismicNews.data.body.map(slice => (
          <SliceMapping slice={slice} />
        ))}
      </div>
    </div>
  )
}

export const query = gql`
  query($id: String!) {
    prismicNews(id: { eq: $id }) {
      id
      uid
      data {
        title {
          text
        }
        date
        featured_image {
          alt
          url
        }
        body {
          ... on PrismicNewsBodyMedia {
            slice_type
            items {
              image {
                url
                alt
              }
            }
          }
          ... on PrismicNewsBodyRichtext {
            slice_type
            primary {
              text {
                html
              }
            }
          }
        }
      }
    }
  }
`

export default News
