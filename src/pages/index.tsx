import React from 'react'
import FrontpageObject from '~/components/Site/FrontpageObject'
import { getLatestNews } from '~/hooks/newsHooks'
import useGetCurrentExhibition from '~/hooks/useGetCurrentExhibition'
import { multipleArtistsHandler, formatExhibitionPeriod } from '~/utils'

const Frontpage = () => {
  const exhibition = useGetCurrentExhibition()
  const latestNews = getLatestNews()
  return (
    <div className="page page__frontpage position-relative">
      {exhibition && (
        <FrontpageObject image={exhibition.data.featured_image}>
          <h1>{multipleArtistsHandler(exhibition.data.artist)}</h1>
          <h1 className="font-italic">{exhibition.data.title.text}</h1>
          <h1>
            {formatExhibitionPeriod(
              exhibition.data.opening,
              exhibition.data.closing
            )}
          </h1>
        </FrontpageObject>
      )}
      {latestNews && (
        <FrontpageObject image={latestNews.featuredImage}>
          <h1>{formatExhibitionPeriod(latestNews.date)}</h1>
          <h1 className="font-italic">{latestNews.title.text}</h1>
        </FrontpageObject>
      )}
    </div>
  )
}

export default Frontpage
