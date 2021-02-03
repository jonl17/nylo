import React, { useContext } from 'react'
import { getAllNews, getLatestNews } from '~/hooks/newsHooks'
import { OverViewItem } from '~/types'
import slugify from 'slugify'
import ButtonLink from '~/components/Site/ButtonLink'
import { ProgramProps } from '../NavBar/types'
import { getAllExhibitions } from '~/hooks/exhibitionHooks'
import { LanguageContext } from '~/context/LanguageContext'
import { langSeek } from '~/lang'
import { Link } from 'gatsby'

const Box: React.FC<{ item: OverViewItem }> = ({ item }) => {
  const { lang } = useContext(LanguageContext)
  return (
    <div className='col-xl-6 p-0'>
      <div className='overview-box mb-1 mr-1'>
        <Link to={`${item.parentUrl}${slugify(item.uid, { lower: true })}`}>
          {item.featuredImage.url && (
            <img
              className='overview-box__featured-image'
              src={item.featuredImage.url}
              alt={item.featuredImage.alt}
            />
          )}
          <p className='mb-1 mt-2'>{item.date}</p>
          <h2 className='mb-2'>{item.title.text}</h2>
          <ButtonLink
            label={langSeek('Read more', lang)}
            to={`${item.parentUrl}${slugify(item.uid, { lower: true })}`}
          ></ButtonLink>
        </Link>
      </div>
    </div>
  )
}

const Overview = ({ name }: ProgramProps & { parentUrl: string }) => {
  const { lang } = useContext(LanguageContext)

  const types: { [key: string]: OverViewItem[] } = {
    AllNews: getAllNews(lang),
    AllExhibitions: getAllExhibitions(lang),
    LatestNews: getLatestNews(lang),
  }

  const items = types[name]

  if (!items) return null

  return (
    <div className='d-flex flex-wrap mr-6 mr-xl-0 mt-3 mb-3 pr-3'>
      {items.map((item, idx) => (
        <Box key={idx} item={item} />
      ))}
    </div>
  )
}

export default Overview
