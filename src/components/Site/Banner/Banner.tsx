import React, { useContext, useEffect, useState } from 'react'
import { useGetAnnouncementBanner } from '~/hooks'
import LanguageButton from '~/components/Site/LanguageButton'
import { LanguageContext } from '~/context/LanguageContext'

const Banner = () => {
  const announcement = useGetAnnouncementBanner()
  const { lang } = useContext(LanguageContext)

  const [theAnnouncement, setTheAnnouncement] = useState('')

  useEffect(() => {
    if (announcement) {
      setTheAnnouncement(announcement[lang]?.data.the_announcement.html)
    }
  }, [lang])

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
      <LanguageButton />
    </div>
  )
}

export default Banner
