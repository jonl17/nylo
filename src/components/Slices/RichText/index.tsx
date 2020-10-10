import React from "react"

const RichText: React.FC<{ primary: { content: { html: string } } }> = ({
  primary,
}) => {
  return (
    <div
      className="para--1 my-3"
      dangerouslySetInnerHTML={{
        __html: primary.content.html,
      }}
    />
  )
}

export default RichText
