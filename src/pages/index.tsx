import React, { useState } from 'react'
import FrontpageObject from '~/components/Site/FrontpageObject'
import { getLatestNews } from '~/hooks/newsHooks'
import useGetCurrentExhibition from '~/hooks/useGetCurrentExhibition'
import { multipleArtistsHandler, formatDate } from '~/utils'
import slugify from 'slugify'
import { Link } from 'gatsby'
import cn from 'classnames'
import CloseButton from '~/components/Site/CloseButton'

const Frontpage = ({
  showSneakPeak,
  triggerSneakPeak,
}: {
  showSneakPeak: boolean
  triggerSneakPeak: (b: boolean) => void
}) => {
  const exhibition = useGetCurrentExhibition()
  const latestNews = getLatestNews()

  return (
    <>
      {exhibition && (
        <button
          onClick={() => triggerSneakPeak(true)}
          className='col-10 w-100 mt-3 mb-5 pl-3 d-flex flex-column frontpage-object--exhibition removeGenericButtonStyles'
        >
          <FrontpageObject image={exhibition.data.featured_image}>
            <h1>{multipleArtistsHandler(exhibition.data.artist)}</h1>
            <h1 className='font-italic'>{exhibition.data.title.text}</h1>
            <h1>
              {formatDate(exhibition.data.opening, exhibition.data.closing)}
            </h1>
          </FrontpageObject>
        </button>
      )}
      {!!latestNews.length && (
        <div className='mt-3 mb-5 pl-3'>
          <h1 className='frontpage-object__heading mb-2'>Fréttir</h1>
          <div className='d-flex'>
            {latestNews.map((x, y) => (
              <Link
                to={`/frettir/${slugify(x.uid)}`}
                className='frontpage-object--news'
              >
                <FrontpageObject
                  key={y}
                  image={x.featuredImage}
                  imageClass='w-100'
                >
                  <p className='mb-1 mt-2'>{formatDate(x.date)}</p>
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

const SneakPeak = ({
  showSneakPeak,
  triggerSneakPeak,
}: {
  showSneakPeak: boolean
  triggerSneakPeak: (b: boolean) => void
}) => {
  return (
    <div
      className={cn('sneak-peak-window d-flex', {
        'sneak-peak-window--open': showSneakPeak,
      })}
    >
      <div className='sneak-peak-window__content col-8'>
        <p>it's a wrap</p>
      </div>
      <button
        onClick={() => triggerSneakPeak(false)}
        className='sneak-peak-window__close-btn col-4'
      >
        <CloseButton />
      </button>
    </div>
  )
}

export default () => {
  const [showSneakPeak, setShowSneakPeak] = useState(false)
  const triggerSneakPeak = (b: boolean) => setShowSneakPeak(b)

  return (
    <div className='page page__frontpage position-relative'>
      <Frontpage
        showSneakPeak={showSneakPeak}
        triggerSneakPeak={triggerSneakPeak}
      />
      <SneakPeak
        showSneakPeak={showSneakPeak}
        triggerSneakPeak={triggerSneakPeak}
      />
    </div>
  )
}
