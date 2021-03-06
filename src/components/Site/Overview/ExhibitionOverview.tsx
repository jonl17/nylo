import React from 'react'
import { getAllExhibitions } from '~/hooks/exhibitionHooks'
import { Language } from '~/lang'
import { ExhibitionInterface } from '~/utils/resolvers'
import {
  formatDate,
  groupExhibitionsByDate,
  multipleArtistsHandler,
} from '~/utils'
import { Link } from 'gatsby'
import { langSeek } from 'balkan-tungumal'

type BoxProps = {
  item: ExhibitionInterface
}

const Box = ({ item }: BoxProps) => {
  return (
    <Link className='col-xl-6 p-0 pr-lg-2' to={item.url}>
      <div className='overview-box mb-1 mr-1'>
        {item.featuredImage.url && (
          <img
            className='overview-box__featured-image'
            src={item.featuredImage.url}
            alt={item.featuredImage.alt}
          />
        )}
        <p className='mb-1 mt-2'>{formatDate(item.opening, item.closing)}</p>
        <h2 className='mb-0'>
          {multipleArtistsHandler(
            item.artist,
            langSeek('Group exhibition', item.lang)
          )}
        </h2>
        <h2 className='mb-2 overview-box__title'>{item.title.text}</h2>
      </div>
    </Link>
  )
}

export default ({ lang }: { lang: Language }) => {
  const exhibitions = getAllExhibitions().filter(node => node.lang === lang)

  const sortedExhibitions = groupExhibitionsByDate(exhibitions)

  const { past, open, upcoming } = groupExhibitionsByDate(exhibitions)

  return (
    <div>
      {!!upcoming.exhibitions.length && (
        <div>
          <h2 className='overview__heading mb-3'>Framundan</h2>
          <div className='d-flex flex-wrap mr-lg-6 mr-xl-0 mb-3 pr-lg-3'>
            {upcoming.exhibitions.map((item, idx) => (
              <Box key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
      {!!open.exhibitions.length && (
        <div>
          <h2 className='overview__heading mb-3'>Í gangi</h2>
          <div className='d-flex flex-wrap mr-lg-6 mr-xl-0 mb-3 pr-lg-3'>
            {open.exhibitions.map((item, idx) => (
              <Box key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
      {!!past.exhibitions.length && (
        <div>
          <h2 className='overview__heading mb-3'>Liðnar</h2>
          <div className='d-flex flex-wrap mr-lg-6 mr-xl-0 mb-3 pr-lg-3'>
            {past.exhibitions.map((item, idx) => (
              <Box key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
