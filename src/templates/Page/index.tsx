import React from "react"
import { graphql, PageProps } from "gatsby"
import styles from "./Page.module.scss"
import { Tween, PlayState } from "react-gsap"
import cn from "classnames"

type BGcolor = "Green" | "White" | null

interface Props {
  data: {
    prismicPage: {
      data: {
        title: {
          text: string
        }
        background_color: BGcolor
        content: {
          html: string
        }
      }
    }
  }
}

const Page: React.FC<Props> = ({ data }) => {
  const { background_color } = data.prismicPage.data
  const findColor = (color: BGcolor) => {
    if (color === "Green") return styles.bgGreen
    else return styles.bgWhite
  }
  return (
    <Tween from={{ x: "-100%" }} duration={0.2}>
      <div className={cn(findColor(background_color), styles.pageContainer)}>
        <div
          className="heading3 mt-3"
          dangerouslySetInnerHTML={{
            __html: data.prismicPage.data.content.html,
          }}
        />
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
        content {
          html
        }
      }
    }
  }
`
