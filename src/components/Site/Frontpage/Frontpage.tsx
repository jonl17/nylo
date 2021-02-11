import React, { Fragment } from 'react'
import { getLatestNews } from '~/hooks/newsHooks'
import useGetCurrentExhibition from '~/hooks/useGetCurrentExhibition'
import { multipleArtistsHandler, formatDate } from '~/utils'
import slugify from 'slugify'
import { Link } from 'gatsby'
import Overview from '~/components/Site/Overview'
import { Language } from '~/lang'

interface Props {
  lang: Language
}

export default ({ lang = 'is' }: Props) => {
  const currentExhibition = useGetCurrentExhibition(lang)
  const latestNews = getLatestNews(lang)

  return (
    <Fragment>
      {currentExhibition && (
        <div className='col-lg-8 p-0 frontpage-object--current-exhibition'>
          <Link
            className='h-100 d-inline-flex flex-column'
            to={currentExhibition.url}
          >
            <div className='frontpage-object__heading mb-3'>
              <h1>{multipleArtistsHandler(currentExhibition.data.artist)}</h1>
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
            <div className='frontpage-object--current-exhibition__img'>
              <img
                src={currentExhibition.data.featured_image.url}
                alt={currentExhibition.data.featured_image.alt}
              />
            </div>
          </Link>
        </div>
      )}
      {/* {latestNews && <Overview name='LatestNews' />} */}
    </Fragment>
  )
}
