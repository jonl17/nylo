import React from 'react'
import { getAllNews } from '~/hooks/newsHooks'
import { NewsItem } from '~/types'
import slugify from 'slugify'
import ButtonLink from '~/components/Site/ButtonLink'

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
        <ButtonLink
          label="Lesa meira"
          to={`/um-nylo/frettir/${slugify(news.uid, { lower: true })}`}
        ></ButtonLink>
      </div>
    </div>
  )
}

const AllNews = () => {
  const allNews = getAllNews()
  return (
    <div className="d-flex flex-wrap mr-6 mr-xl-0 mt-3 mb-3 pr-3">
      {allNews.map((item, idx) => (
        <NewsBox key={idx} news={item} />
      ))}
    </div>
  )
}

export default AllNews
