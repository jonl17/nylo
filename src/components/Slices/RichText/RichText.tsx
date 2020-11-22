import React from "react"
import { RichTextProps } from "~/types"

const RichText = ({ primary: { text, type = "large" } }: RichTextProps) => {
  return (
    <div
      className={`rich-text--${type}`}
      dangerouslySetInnerHTML={{
        __html: text.html,
      }}
    />
  )
}

export default RichText
