import React, { Fragment } from 'react'
import { multipleArtistsHandler, formatDate } from '~/utils'
import { Link } from 'gatsby'
import { langSeek } from 'balkan-tungumal'
import { exhibitionResolver } from '~/utils/resolvers'

export default ({ primary }: { primary: any }) => {
  const exhibition = exhibitionResolver(primary.exhibition.document)

  if (!exhibition) return null

  return (
    <Fragment>
      <div className='col-lg-8 pl-0 pb-lg-3 frontpage-object--current-exhibition'>
        <Link
          state={{ animate: true }}
          className='h-100 d-inline-flex flex-column'
          to={exhibition.url}
        >
          <div className='frontpage-object__heading mb-3'>
            <h1>
              {multipleArtistsHandler(
                exhibition.artist,
                langSeek('Group exhibition', exhibition.lang)
              )}
            </h1>
            <h1 className='font-italic'>{exhibition.title.text}</h1>
            <h1>{formatDate(exhibition.opening, exhibition.closing)}</h1>
          </div>
          <div className='frontpage-object__image-wrapper'>
            <img
              src={exhibition.featuredImage.url}
              alt={exhibition.featuredImage.alt}
            />
          </div>
        </Link>
      </div>
    </Fragment>
  )
}
