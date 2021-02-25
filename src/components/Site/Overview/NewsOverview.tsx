import React from 'react'
import { getAllNews } from '~/hooks/newsHooks'
import ButtonLink from '~/components/Site/ButtonLink'
import { langSeek, Language } from '~/lang'
import { NewsInterface } from '~/utils/resolvers'
import linkResolver from '~/utils/linkResolver'

type BoxProps = {
  item: NewsInterface
}

const Box = ({ item }: BoxProps) => {
  return (
    <div className='col-xl-6 p-0'>
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
        <ButtonLink
          label={langSeek('Read more', item.lang)}
          to={linkResolver(item)}
        ></ButtonLink>
      </div>
    </div>
  )
}

export default ({ lang }: { lang: Language }) => {
  const news = getAllNews().filter(node => node.lang === lang)

  if (!news) return null

  return (
    <div className='d-flex flex-wrap mr-6 mr-xl-0 mt-3 mb-3 pr-3'>
      {news.map((item, idx) => (
        <Box key={idx} item={item} />
      ))}
    </div>
  )
}
