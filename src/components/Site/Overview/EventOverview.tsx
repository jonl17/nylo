import React, { useState } from 'react'
import { Language } from '~/lang'
import { EventInterface } from '~/utils/resolvers'
import { Link } from 'gatsby'
import { formatDate } from '~/utils'
import useGetEvents from '~/hooks/useGetEvents'
import { Fade } from 'react-reveal'
import LoadMoreButton from './LoadMoreButton'

type BoxProps = {
  item: EventInterface
}

const Box = ({ item }: BoxProps) => {
  return (
    <Fade>
      <Link to={item.url}>
        <div className='mb-lg-2'>
          {item.image.url && (
            <img
              className='overview-box__featured-image'
              src={item.image.url}
              alt={item.image.alt}
            />
          )}
          <p className='mb-1 mt-2'>{formatDate(item.date)}</p>
          <p>{item.time}</p>
          <h2 className='mb-2'>{item.name.text}</h2>
        </div>
      </Link>
    </Fade>
  )
}

export default ({ lang }: { lang: Language }) => {
  const events = useGetEvents().filter(node => node.lang === lang)

  if (!events.length) return null

  const [loadMore, setLoadMore] = useState(20)

  return (
    <div>
      <div className='overview__grid mr-lg-6 mr-xl-0 mb-3 pr-lg-3 w-100'>
        {events.map((item, idx) => (
          <Box key={idx} item={item} />
        ))}
      </div>
      {loadMore < events.length && (
        <LoadMoreButton onClick={() => setLoadMore(prev => prev + 20)} />
      )}
    </div>
  )
}
