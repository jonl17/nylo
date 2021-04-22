import React, { useState } from 'react'
import { getAllExhibitions } from '~/hooks/exhibitionHooks'
import { Language } from '~/lang'
import { ExhibitionInterface } from '~/utils/resolvers'
import {
  formatDate,
  groupExhibitionsByDate,
  multipleArtistsHandler,
} from '~/utils'
import { Link } from 'gatsby'
import Button from '~/components/Site/Button'

type BoxProps = {
  item: ExhibitionInterface
}

const Box = ({ item }: BoxProps) => {
  return (
    <Link className='col-xl-6 p-0 pr-lg-2 flex-1' to={item.url}>
      <div className='overview-box mb-1 mr-lg-1'>
        {item.featuredImage.url && (
          <img
            className='overview-box__featured-image'
            src={item.featuredImage.url}
            alt={item.featuredImage.alt}
          />
        )}
        <div className='overview-box__text'>
          <p className='mb-1 mt-2'>{formatDate(item.opening, item.closing)}</p>
          <h2 className='mb-0'>{multipleArtistsHandler(item.artist, '')}</h2>
          <h2 className='mb-2 overview-box__title font-italic'>
            {item.title.text}
          </h2>
        </div>
      </div>
    </Link>
  )
}

const Exhibitions = ({
  exhibitions,
}: {
  exhibitions: ExhibitionInterface[]
}) => {
  console.log(exhibitions)
  return (
    <div className='d-flex flex-wrap mr-lg-6 mr-xl-0 mb-3 pr-lg-3'>
      {exhibitions.map((item, idx) => (
        <Box key={idx} item={item} />
      ))}
    </div>
  )
}

export default ({ lang }: { lang: Language }) => {
  const exhibitions = getAllExhibitions().filter(node => node.lang === lang)

  const { past, open, upcoming } = groupExhibitionsByDate(exhibitions)

  const [filter, setFilter] = useState('open')

  const types: { [key: string]: { exhibitions: ExhibitionInterface } } = {
    open: open,
    past: past,
    upcoming: upcoming,
  }

  return (
    <div>
      <div className='mb-3'>
        <Button label='Í gangi' onClick={() => setFilter('open')} />
        <Button label='Liðnar' onClick={() => setFilter('past')} />
        <Button label='Framundan' onClick={() => setFilter('upcoming')} />
      </div>
      <Exhibitions exhibitions={types[filter].exhibitions} />
      {/* {!!open.exhibitions.length && (
        <div>
          <h2 className='overview__heading mb-3'>Yfirstandandi</h2>
          <div className='d-flex flex-wrap mr-lg-6 mr-xl-0 mb-3 pr-lg-3'>
            {open.exhibitions.map((item, idx) => (
              <Box key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
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

      {!!past.exhibitions.length && (
        <div>
          <h2 className='overview__heading mb-3'>Liðnar</h2>
          <div className='d-flex flex-wrap mr-lg-6 mr-xl-0 mb-3 pr-lg-3'>
            {past.exhibitions.map((item, idx) => (
              <Box key={idx} item={item} />
            ))}
          </div>
        </div>
      )} */}
    </div>
  )
}
