import React from 'react'
import FrontpageObject from '~/components/Site/FrontpageObject'
import { getLatestNews } from '~/hooks/newsHooks'
import useGetCurrentExhibition from '~/hooks/useGetCurrentExhibition'
import { multipleArtistsHandler, formatDate } from '~/utils'
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
              {formatDate(exhibition.data.opening, exhibition.data.closing)}
            </h1>
          </Link>
        </FrontpageObject>
      )}
    </div>
  )
}

export default Frontpage
