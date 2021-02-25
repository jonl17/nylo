import React, { memo } from 'react'
import useGetAnnouncement from '~/hooks/useGetAnnouncement'
import LanguageButton from '~/components/Site/LanguageButton'
import { Language } from '~/lang'

const Banner = ({ ctx }: { ctx: { lang: Language; page: any } }) => {
  const data = useGetAnnouncement().find(node => node.lang === ctx.lang)
  return (
    <div className='banner' id='banner'>
      {data && (
        <div
          dangerouslySetInnerHTML={{
            __html: data.announcement.html,
          }}
          className='banner__marquee center'
        />
      )}
      <LanguageButton page={ctx} />
    </div>
  )
}

export default Banner
