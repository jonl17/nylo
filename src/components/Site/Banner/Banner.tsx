import React from 'react'
import { useGetAnnouncementBanner } from '~/hooks'

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
    </div>
  )
}

export default Banner
