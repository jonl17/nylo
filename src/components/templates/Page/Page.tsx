import React, { useEffect } from "react"
import { graphql, navigate } from "gatsby"
import SliceMapping from "~/components/Slices/mapping"
import cn from "classnames"
import { BGcolor, RichTextSliceType, ImageReelSliceType } from "~/types"
import { SecondaryNavBar } from "~/components/Site/SecondaryNavBar"
import { useLocation } from "@reach/router"
import "~/fragments/media"

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
  const { pathname } = useLocation() // todo make this redirect better

  useEffect(() => {
    if (pathname === "/um-nylo" || pathname === "/um-nylo/") {
      navigate("/um-nylo/um-safnid")
    }
  }, [])

  const { background_color } = data.prismicPage.data

  const findColor = (color: BGcolor) => {
    if (color === "Green") return "bg--green"
    else return "bg--white"
  }

  const slices = data.prismicPage.data.body

  return (
    <div className={cn(findColor(background_color), "page")}>
      {pageContext.parentPageUid && (
        <SecondaryNavBar parentPageUid={pageContext.parentPageUid} />
      )}
      <div className="content">
        {slices &&
          slices.map((slice, idx) => <SliceMapping key={idx} slice={slice} />)}
      </div>
    </div>
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
          ... on PrismicPageBodyAllNews {
            id
          }
          ... on PrismicPageBodyMedia {
            slice_type
            items {
              image {
                url
                alt
              }
            }
          }
          ... on PrismicPageBodyRichtext {
            slice_type
            primary {
              type
              text {
                html
              }
            }
          }
          ... on PrismicPageBodyAllNews {
            slice_type
          }
        }
      }
    }
  }
`
