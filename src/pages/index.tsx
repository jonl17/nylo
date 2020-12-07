import React from 'react'
import FrontpageObject from '~/components/Site/FrontpageObject'
import { getLatestNews } from '~/hooks/newsHooks'
import useGetCurrentExhibition from '~/hooks/useGetCurrentExhibition'
import { multipleArtistsHandler, formatExhibitionPeriod } from '~/utils'
import { Link } from 'gatsby'

const Frontpage = () => {
  const exhibition = useGetCurrentExhibition()
  const latestNews = getLatestNews()
  return (
    <div className='page page__frontpage position-relative'>
      {exhibition && (
        <FrontpageObject
          className='d-flex flex-column'
          image={exhibition.data.featured_image}
        >
          <Link className='d-inline-block' to='/syningar'>
            <h1>{multipleArtistsHandler(exhibition.data.artist)}</h1>
            <h1 className='font-italic'>{exhibition.data.title.text}</h1>
            <h1>
              {formatExhibitionPeriod(
                exhibition.data.opening,
                exhibition.data.closing
              )}
            </h1>
          </Link>
        </FrontpageObject>
      )}
      {latestNews && (
        <FrontpageObject
          className='d-flex flex-column'
          image={latestNews.featuredImage}
        >
          <Link className='d-inline-block' to={`/frettir/${latestNews.uid}`}>
            <h1>{formatExhibitionPeriod(latestNews.date)}</h1>
            <h1 className='font-italic'>{latestNews.title.text}</h1>
          </Link>
        </FrontpageObject>
      )}
    </div>
  )
}

export default Frontpage
