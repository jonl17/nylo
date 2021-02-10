import React, { useContext } from 'react'
import { getLatestNews } from '~/hooks/newsHooks'
import useGetCurrentExhibition from '~/hooks/useGetCurrentExhibition'
import { multipleArtistsHandler, formatDate } from '~/utils'
import slugify from 'slugify'
import { Link } from 'gatsby'
import { LanguageContext } from '~/context/LanguageContext'
import Overview from '~/components/Site/Overview'

const Frontpage = ({}: {}) => {
  const { lang } = useContext(LanguageContext)
  const currentExhibition = useGetCurrentExhibition(lang)
  const latestNews = getLatestNews(lang)

  return (
    <div className='page page__frontpage position-relative p-3'>
      {currentExhibition && (
        <div className='col-lg-8 p-0 frontpage-object--current-exhibition'>
          <Link
            className='h-100 d-inline-flex flex-column'
            to={`/syningar${slugify(currentExhibition.url)}`}
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
      {latestNews && <Overview name='LatestNews' />}
    </div>
  )
}

export default Frontpage
