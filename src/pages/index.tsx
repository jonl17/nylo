import React, { useContext } from 'react'
import FrontpageObject from '~/components/Site/FrontpageObject'
import { getLatestNews } from '~/hooks/newsHooks'
import useGetCurrentExhibition from '~/hooks/useGetCurrentExhibition'
import { multipleArtistsHandler, formatDate } from '~/utils'
import slugify from 'slugify'
import { Link } from 'gatsby'

const Frontpage = ({}: {}) => {
  const exhibition = useGetCurrentExhibition()
  const latestNews = getLatestNews()

  return (
    <>
      {exhibition && (
        <Link
          to={`/syningar/${slugify(exhibition.uid)}`}
          className='col-10 w-100 mt-3 mb-5 pl-3 d-flex flex-column frontpage-object--exhibition removeGenericButtonStyles'
        >
          <FrontpageObject image={exhibition.data.featured_image}>
            <h1>{multipleArtistsHandler(exhibition.data.artist)}</h1>
            <h1 className='font-italic'>{exhibition.data.title.text}</h1>
            <h1>
              {formatDate(exhibition.data.opening, exhibition.data.closing)}
            </h1>
          </FrontpageObject>
        </Link>
      )}
      {!!latestNews.length && (
        <div className='mt-3 mb-5 pl-3'>
          <h1 className='frontpage-object__heading mb-2'>Fréttir</h1>
          <div className='d-flex'>
            {latestNews.map((x, y) => (
              <Link
                key={y}
                to={`/frettir/${slugify(x.uid)}`}
                className='frontpage-object--news'
              >
                <FrontpageObject image={x.featuredImage} imageClass='w-100'>
                  <p className='mb-1 mt-2'>{x.date}</p>
                  <h1>{x.title.text}</h1>
                </FrontpageObject>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default () => {
  return (
    <div className='page page__frontpage position-relative'>
      <Frontpage />
    </div>
  )
}
