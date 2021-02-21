import React, { useContext, useEffect, useState } from 'react'
import { useGetAnnouncementBanner } from '~/hooks'
import LanguageButton from '~/components/Site/LanguageButton'
import { LanguageContext } from '~/context/LanguageContext'

const Banner = ({ page }: { page: any }) => {
  const announcement = useGetAnnouncementBanner()
  const [theAnnouncement, setTheAnnouncement] = useState('')

  return (
    <div className='banner' id='banner'>
      {announcement && (
        <div
          dangerouslySetInnerHTML={{
            __html: theAnnouncement,
          }}
          className='banner__marquee center'
        />
      )}
      <LanguageButton page={page} />
    </div>
  )
}

export default Banner
