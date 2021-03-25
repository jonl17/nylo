import React from 'react'
import useGetAnnouncement from '~/hooks/useGetAnnouncement'
import LanguageButton from '~/components/Site/LanguageButton'
import SearchButton from '~/components/Site/SearchButton'
import { Language } from '~/lang'
import { PageInterface } from '~/utils/resolvers'
import { useSearch } from '~/context/searchContext'
import { useLocation } from '@reach/router'

const Banner = ({ ctx }: { ctx: { lang: Language; page: PageInterface } }) => {
  const data = useGetAnnouncement().find(node => node.lang === ctx.lang)

  const { update } = useSearch()

  const { pathname } = useLocation()

  const isSearchPage = pathname === '/leit' || pathname === '/en-us/search'

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
        {isSearchPage && (
          <input
            onChange={e => update(e.target.value)}
            type='text'
            className='search-input'
            autoFocus
            placeholder={
              ctx.lang === 'is'
                ? 'Sláðu inn leitarstreng...'
                : 'Type in keywords...'
            }
          />
        )}
        <SearchButton lang={ctx.lang} />
        <LanguageButton page={ctx} />
      </div>
    </div>
  )
}

export default Banner
