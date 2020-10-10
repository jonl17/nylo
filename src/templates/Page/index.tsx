import React from "react"
import { graphql, PageProps } from "gatsby"
import styles from "./Page.module.scss"
import { Tween, PlayState } from "react-gsap"
import "~/styles/components/_image.scss"
import SliceMapping from "~/components/Slices/mapping"
import cn from "classnames"

type BGcolor = "Green" | "White" | null

interface RichTextSliceType {
  content: {
    html: string
    text: string
  }
}

interface ImageReelSliceType {
  image: {
    url: string
    alt: string
  }
}

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
  rest: PageProps
}

const Page: React.FC<Props> = ({ data, ...rest }) => {
  console.log(data)
  const { background_color } = data.prismicPage.data
  const findColor = (color: BGcolor) => {
    if (color === "Green") return styles.bgGreen
    else return styles.bgWhite
  }
  const slices = data.prismicPage.data.body

  return (
    <Tween from={{ x: "-100%" }} duration={0.25}>
      <div className={cn(findColor(background_color), styles.pageContainer)}>
        {slices &&
          slices.map((slice, idx) => <SliceMapping key={idx} slice={slice} />)}
      </div>
    </Tween>
  )
}

export default Page

export const query = graphql`
  query($id: String!) {
    prismicPage(id: { eq: $id }) {
      data {
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
