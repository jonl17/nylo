import React from 'react'
import { Language } from '~/lang'
import { EventInterface } from '~/utils/resolvers'
import { Link } from 'gatsby'
import { formatDate } from '~/utils'
import useGetEvents from '~/hooks/useGetEvents'

type BoxProps = {
  item: EventInterface
}

const Box = ({ item }: BoxProps) => {
  return (
    <Link to={item.url} className='col-lg-6 p-0 pr-lg-2'>
      <div className='overview-box mb-1 mr-1'>
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
  )
}

export default ({ lang }: { lang: Language }) => {
  const events = useGetEvents().filter(node => node.lang === lang)

  if (!events.length) return null

  return (
    <div className='d-flex flex-wrap mr-lg-6 mr-xl-0 mb-3 pr-lg-3 w-100'>
      {events.map((item, idx) => (
        <Box key={idx} item={item} />
      ))}
    </div>
  )
}
