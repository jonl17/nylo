import React from "react"

const RichText: React.FC<{ primary: { content: { html: string } } }> = ({
  primary,
}) => {
  return (
    <div
      className="parag--1 my-3 mr-6 pr-3 pr-xl-0"
      dangerouslySetInnerHTML={{
        __html: primary.content.html,
      }}
    />
  )
}

export default RichText
