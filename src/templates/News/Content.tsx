import React from "react"
import { NewsItem } from "~/types"
import RichText from "~/components/Slices/RichText/RichText"

const Content: React.FC<{ news: NewsItem }> = ({ news }) => {
  console.log(news)
  return (
    <div className="my-3 mr-6">
      <p>{news.date}</p>
      <h1 className="hdln--1">{news.title.text}</h1>
      <img
        className="w-100 mr-6 py-3"
        src={news.featuredImage.url}
        alt={news.featuredImage.alt}
      />
      <div
        className="parag--1"
        dangerouslySetInnerHTML={{ __html: news.content.html }}
      />
    </div>
  )
}

export default Content
