import React from 'react'
import FrontpageObject from '~/components/Site/FrontpageObject'
import { getLatestNews } from '~/hooks/newsHooks'
import useGetCurrentExhibition from '~/hooks/useGetCurrentExhibition'
import { multipleArtistsHandler, formatDate } from '~/utils'
import { Link } from 'gatsby'
import slugify from 'slugify'

const Frontpage = () => {
  const exhibition = useGetCurrentExhibition()
  const latestNews = getLatestNews()
  console.log(latestNews)
  return (
    <div className='page page__frontpage position-relative'>
      {exhibition && (
        <div className='mt-3 mb-5 pl-3'>
          <FrontpageObject
            to={`/syningar`}
            className='d-flex flex-column frontpage-object--exhibition'
            image={exhibition.data.featured_image}
          >
            <h1>{multipleArtistsHandler(exhibition.data.artist)}</h1>
            <h1 className='font-italic'>{exhibition.data.title.text}</h1>
            <h1>
              {formatDate(exhibition.data.opening, exhibition.data.closing)}
            </h1>
          </FrontpageObject>
        </div>
      )}
      {!!latestNews.length && (
        <div className='mt-3 mb-5 pl-3'>
          <h1 className='frontpage-object__heading mb-2'>Fréttir</h1>
          <div className='d-flex'>
            {latestNews.map((x, y) => (
              <FrontpageObject
                to={`/frettir/${slugify(x.uid)}`}
                className='frontpage-object--news'
                key={y}
                image={x.featuredImage}
                imageClass='w-100'
              >
                <p className='mb-0'>{formatDate(x.date)}</p>
                <h1>{x.title.text}</h1>
              </FrontpageObject>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Frontpage
