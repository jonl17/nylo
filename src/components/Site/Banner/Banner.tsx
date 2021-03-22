import React from 'react'
import useGetAnnouncement from '~/hooks/useGetAnnouncement'
import LanguageButton from '~/components/Site/LanguageButton'
import SearchButton from '~/components/Site/SearchButton'
import { Language } from '~/lang'
import { PageInterface } from '~/utils/resolvers'

const Banner = ({ ctx }: { ctx: { lang: Language; page: PageInterface } }) => {
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
      <div className='d-flex justify-content-end '>
        <SearchButton lang={ctx.lang} />
        <LanguageButton page={ctx} />
      </div>
    </div>
  )
}

export default Banner
