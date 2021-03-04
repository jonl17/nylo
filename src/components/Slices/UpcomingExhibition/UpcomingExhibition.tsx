import React from 'react'
import { formatDate, multipleArtistsHandler } from '~/utils'
import { exhibitionResolver } from '~/utils/resolvers'
import { Link } from 'gatsby'
import { langSeek } from 'balkan-tungumal'

const UpcomingExhibition = ({ primary }: { primary: any }) => {
  const exhibition = exhibitionResolver(primary.upcoming_exhibition.document)

  return (
    <Link
      state={{ animate: true }}
      to={exhibition.url}
      className='col-lg-6 p-0 upcoming-exhibition'
    >
      <h1 className='upcoming-exhibition__heading'>
        {langSeek('Upcoming exhibition', exhibition.lang)}
      </h1>
      <div className='upcoming-exhibition__content'>
        <h1>{multipleArtistsHandler(exhibition.artist)}</h1>
        <h1 className='font-italic'>{exhibition.title.text}</h1>
        <h1>{formatDate(exhibition.opening, exhibition.closing)}</h1>
        <img
          className='pt-2'
          src={exhibition.featuredImage.url}
          alt={exhibition.featuredImage.alt}
        />
      </div>
    </Link>
  )
}

export default UpcomingExhibition
