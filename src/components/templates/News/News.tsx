import React from "react"
import { SecondaryNavBar } from "~/components/Site/SecondaryNavBar"
import { PageProps, graphql as gql, Link } from "gatsby"
import { NewsItem, NewsQuery } from "~/types"
import SliceMapping from "~/components/Slices/mapping"
import { useLocation } from "@reach/router"
import Icon from "~/components/Site/Icon"

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
  const { pathname } = useLocation()

  return (
    <div className="page bg--green">
      <SecondaryNavBar parentPageUid="um-nylo" />
      <div className="content">
        {pathname.includes("/um-nylo/") && (
          <Link to="/">
            <Icon className="icon__exit" type="Exit" />
          </Link>
        )}
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
