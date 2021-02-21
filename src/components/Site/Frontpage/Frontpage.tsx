import React, { Fragment } from 'react'
import { multipleArtistsHandler, formatDate } from '~/utils'
import { Link } from 'gatsby'
import { langSeek } from 'balkan-tungumal'

export default ({ currentExhibition }: { currentExhibition: any }) => {
  return (
    <Fragment>
      {currentExhibition && (
        <div className='col-lg-8 p-0 frontpage-object--current-exhibition'>
          <Link
            className='h-100 d-inline-flex flex-column'
            to={currentExhibition.url}
          >
            <div className='frontpage-object__heading mb-3'>
              <h1>
                {multipleArtistsHandler(
                  currentExhibition.data.artist,
                  langSeek('Group exhibition', lang)
                )}
              </h1>
              <h1 className='font-italic'>
                {currentExhibition.data.title.text}
              </h1>
              <h1>
                {formatDate(
                  currentExhibition.data.opening,
                  currentExhibition.data.closing
                )}
              </h1>
            </div>
            <img
              src={currentExhibition.data.featured_image.url}
              alt={currentExhibition.data.featured_image.alt}
            />
          </Link>
        </div>
      )}
      {/* {latestNews && <Overview name='LatestNews' />} */}
    </Fragment>
  )
}
