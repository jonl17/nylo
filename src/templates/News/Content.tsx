import React from "react"
import { NewsItem } from "~/types"
import SliceMapping from "~/components/Slices/mapping"

const Content: React.FC<{ news: NewsItem }> = ({ news, children }) => {
  return (
    <div className="my-3 mr-6 pr-3 pr-xl-0">
      <p>{news.date}</p>
      <h1>{news.title.text}</h1>
      {children}
    </div>
  )
}

export default Content
