import React from 'react'
import { useGetAnnouncementBanner } from '~/hooks'
import LanguageButton from '~/components/Site/LanguageButton'

const Banner = () => {
  const announcement = useGetAnnouncementBanner()
  return (
    <div className='banner' id='banner'>
      {announcement && (
        <div
          dangerouslySetInnerHTML={{ __html: announcement }}
          className='banner__marquee center'
        />
      )}
      <LanguageButton />
    </div>
  )
}

export default Banner
