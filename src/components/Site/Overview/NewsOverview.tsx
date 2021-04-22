import React, { useState } from 'react'
import { Language } from '~/lang'
import { NewsInterface } from '~/utils/resolvers'
import useGetNews from '~/hooks/useGetNews'
import { Link } from 'gatsby'
import { formatDate } from '~/utils'
import { Fade } from 'react-reveal'
import LoadMoreButton from './LoadMoreButton'

type BoxProps = {
  item: NewsInterface
}

const Box = ({ item }: BoxProps) => {
  return (
    <Fade>
      <Link to={item.url}>
        <div className='mb-lg-2'>
          {item.featuredImage.url && (
            <img
              className='overview-box__featured-image'
              src={item.featuredImage.url}
              alt={item.featuredImage.alt}
            />
          )}
          <p className='mb-1 mt-2'>{formatDate(item.date)}</p>
          <h2 className='mb-2'>{item.title.text}</h2>
        </div>
      </Link>
    </Fade>
  )
}

export default ({ lang }: { lang: Language }) => {
  const news = useGetNews().filter(node => node.lang === lang)

  if (!news) return null

  const [loadMore, setLoadMore] = useState(20)

  return (
    <div>
      <div className='overview__grid mr-lg-6 mr-xl-0 mb-3 pr-lg-3 w-100'>
        {news.slice(0, loadMore).map((item, idx) => (
          <Box key={idx} item={item} />
        ))}
      </div>
      {loadMore < news.length && (
        <LoadMoreButton onClick={() => setLoadMore(prev => prev + 20)} />
      )}
    </div>
  )
}
