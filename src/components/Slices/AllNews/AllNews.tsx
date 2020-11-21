import React from "react"
import { useGetAllNews } from "~/hooks"
import { NewsItem } from "~/types"
import slugify from "slugify"
import { Button } from "~/components/Site/Button"

const NewsBox: React.FC<{ news: NewsItem }> = ({ news }) => {
  return (
    <div className="col-xl-6 mb-4">
      <div className="newsbox mr-1">
        <img
          className="newsbox__featured-image"
          src={news.featuredImage.url}
          alt={news.featuredImage.alt}
        />
        <p className="mb-1 mt-2">{news.date}</p>
        <h2 className="mb-3">{news.title.text}</h2>
        <Button
          label="Lesa meira"
          to={`/um-nylo/frettir/${slugify(news.id, { lower: true })}`}
        ></Button>
      </div>
    </div>
  )
}

const AllNews = () => {
  const { allNews } = useGetAllNews()
  return (
    <div className="d-flex flex-wrap mr-6 mr-xl-0 mt-3 mb-3 pr-3">
      {allNews.map((item, idx) => (
        <NewsBox key={idx} news={item} />
      ))}
    </div>
  )
}

export default AllNews
