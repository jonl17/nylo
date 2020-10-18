import React from "react"
import { SecondaryNavBar } from "~/components/Site/SecondaryNavBar"
import "~/styles/components/_pageContainer.scss"
import cn from "classnames"
import { PageProps, graphql as gql } from "gatsby"
import Content from "./Content"
import { NewsItem } from "~/types"

interface NewsQuery {
  prismicNews: {
    id: string
    uid: string
    data: {
      title: {
        text: string
      }
      date: string
      content: {
        html: string
      }
      featured_image: {
        alt: string
        url: string
      }
    }
  }
}

const News: React.FC<{ pageContext: PageProps; data: NewsQuery }> = ({
  pageContext,
  data,
}) => {
  const news: NewsItem = {
    id: data.prismicNews.id,
    uid: data.prismicNews.uid,
    title: data.prismicNews.data.title,
    date: data.prismicNews.data.date,
    content: data.prismicNews.data.content,
    featuredImage: data.prismicNews.data.featured_image,
  }
  return (
    <div className={cn("bg--green", "pageContainer")}>
      <SecondaryNavBar parentPageUid="um-nylo" />
      <Content news={news} />
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
        content {
          html
        }
        featured_image {
          alt
          url
        }
      }
    }
  }
`

export default News
