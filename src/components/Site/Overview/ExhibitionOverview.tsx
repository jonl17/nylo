import React from 'react'
import ButtonLink from '~/components/Site/ButtonLink'
import { getAllExhibitions } from '~/hooks/exhibitionHooks'
import { langSeek, Language } from '~/lang'
import { ExhibitionInterface } from '~/utils/resolvers'
import linkResolver from '~/utils/linkResolver'
import { formatDate } from '~/utils'

type BoxProps = {
  item: ExhibitionInterface
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
        <p className='mb-1 mt-2'>{formatDate(item.opening, item.closing)}</p>
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
  const exhibitions = getAllExhibitions().filter(node => node.lang === lang)
  return (
    <div className='d-flex flex-wrap mr-lg-6 mr-xl-0 mt-lg-3 mb-3 pr-lg-3'>
      {exhibitions.map((item, idx) => (
        <Box key={idx} item={item} />
      ))}
    </div>
  )
}
