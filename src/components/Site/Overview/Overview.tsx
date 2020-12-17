import React from 'react'
import { getAllNews } from '~/hooks/newsHooks'
import { OverViewItem } from '~/types'
import slugify from 'slugify'
import ButtonLink from '~/components/Site/ButtonLink'
import { formatDate } from '~/utils'

const Box: React.FC<{ item: OverViewItem }> = ({ item }) => {
  return (
    <div className='col-xl-6 mb-4'>
      <div className='newsbox mr-1'>
        {item.featuredImage.url && (
          <img
            className='newsbox__featured-image'
            src={item.featuredImage.url}
            alt={item.featuredImage.alt}
          />
        )}
        <p className='mb-1 mt-2'>{formatDate(item.date)}</p>
        <h2 className='mb-2'>{item.title.text}</h2>
        <ButtonLink
          label='Lesa meira'
          to={`/frettir/${slugify(item.uid, { lower: true })}`}
        ></ButtonLink>
      </div>
    </div>
  )
}

const Overview = () => {
  const allNews = getAllNews()
  return (
    <div className='d-flex flex-wrap mr-6 mr-xl-0 mt-3 mb-3 pr-3'>
      {allNews.map((item, idx) => (
        <Box key={idx} item={item} />
      ))}
    </div>
  )
}

export default Overview
