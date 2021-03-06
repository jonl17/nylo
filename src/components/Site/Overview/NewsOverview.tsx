import React from 'react'
import { langSeek, Language } from '~/lang'
import { NewsInterface } from '~/utils/resolvers'
import useGetNews from '~/hooks/useGetNews'
import { Link } from 'gatsby'

type BoxProps = {
  item: NewsInterface
}

const Box = ({ item }: BoxProps) => {
  return (
    <Link to={item.url} className='col-lg-6 p-lg-0 pr-lg-2'>
      <div className='overview-box mb-1 mr-1'>
        {item.featuredImage.url && (
          <img
            className='overview-box__featured-image'
            src={item.featuredImage.url}
            alt={item.featuredImage.alt}
          />
        )}
        <p className='mb-1 mt-2'>{item.date}</p>
        <h2 className='mb-2'>{item.title.text}</h2>
      </div>
    </Link>
  )
}

export default ({ lang }: { lang: Language }) => {
  const news = useGetNews().filter(node => node.lang === lang)

  if (!news) return null

  return (
    <div className='d-flex flex-wrap mr-lg-6 mr-xl-0 mb-3 pr-lg-3 w-100'>
      {news.map((item, idx) => (
        <Box key={idx} item={item} />
      ))}
    </div>
  )
}
