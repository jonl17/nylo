import React from "react"
import { graphql, PageProps } from "gatsby"
import styles from "./Page.module.scss"
import { Tween } from "react-gsap"
import "~/styles/components/_image.scss"
import SliceMapping from "~/components/Slices/mapping"
import cn from "classnames"
import { BGcolor, RichTextSliceType, ImageReelSliceType } from "~/types"
import SecondaryNavBar from "~/components/Site/SecondaryNavBar"
import Icon from "~/components/Site/Icon"

interface Props {
  data: {
    prismicPage: {
      data: {
        title: {
          text: string
        }
        background_color: BGcolor
        body: {
          __typename: string
          primary: RichTextSliceType
          items: ImageReelSliceType[]
        }[]
      }
    }
  }
  pageContext: {
    id: string
    parentPageUid?: string
  }
}

const Page: React.FC<Props> = ({ data, pageContext }) => {
  const { background_color } = data.prismicPage.data

  const findColor = (color: BGcolor) => {
    if (color === "Green") return styles.bgGreen
    else return styles.bgWhite
  }

  const slices = data.prismicPage.data.body

  return (
    <>
      <div className={cn(findColor(background_color), styles.pageContainer)}>
        {pageContext.parentPageUid && (
          <SecondaryNavBar parentPageUid={pageContext.parentPageUid} />
        )}
        {slices &&
          slices.map((slice, idx) => <SliceMapping key={idx} slice={slice} />)}
      </div>
    </>
  )
}

export default Page

export const query = graphql`
  query($id: String!) {
    prismicPage(id: { eq: $id }) {
      data {
        subpage {
          uid
        }
        title {
          text
        }
        background_color
        body {
          __typename
          ... on PrismicPageBodyImageReel {
            items {
              image {
                url
                alt
              }
            }
          }
          ... on PrismicPageBodyRichText {
            primary {
              content {
                html
              }
            }
          }
        }
      }
    }
  }
`
