import React from "react"
import { useGetAllNews } from "~/hooks"
import { NewsItem } from "~/types"
import { Link } from "gatsby"
import slugify from "slugify"
import cn from "classnames"
import styles from "./AllNews.module.scss"
import { Button } from "~/components/Site/Button"

const NewsBox: React.FC<{ news: NewsItem }> = ({ news }) => {
  return (
    <div className="col-6">
      <div className={cn("mr-1", styles.contentBox)}>
        <img
          className={styles.featuredImage}
          src={news.featuredImage.url}
          alt={news.featuredImage.alt}
        />
        <p>{news.date}</p>
        <h1 className="hdln--2">{news.title.text}</h1>
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
    <div className="d-flex flex-wrap mr-6 mt-3">
      {allNews.map((item, idx) => (
        <NewsBox key={idx} news={item} />
      ))}
    </div>
  )
}

export default AllNews
