import React, { useEffect, useRef } from 'react'
import useGetAnnouncement from '~/hooks/useGetAnnouncement'
import useGetFooter from '~/hooks/useGetFooter'
import LanguageButton from '~/components/Site/LanguageButton'
import SearchButton from '~/components/Site/SearchButton'
import { Language, langSeek } from '~/lang'
import { PageInterface } from '~/utils/resolvers'
import { useSearch } from '~/context/searchContext'
import { useLocation } from '@reach/router'

const Banner = ({ ctx }: { ctx: { lang: Language; page: PageInterface } }) => {
  const announcement = useGetAnnouncement().find(node => node.lang === ctx.lang)
  const footer = useGetFooter()

  const { update } = useSearch()

  const { pathname } = useLocation()

  const isSearchPage = pathname === '/leit' || pathname === '/leit/' || pathname === '/en-us/search' || pathname === '/en-us/search/'

  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchPage && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchPage])

  // Show announcement if exists, otherwise show opening hours with label
  const hasAnnouncement = announcement?.announcement?.html
  const openingHoursLabel = langSeek('Opening hours', ctx.lang)

  let bannerContent = null
  if (hasAnnouncement) {
    bannerContent = announcement.announcement.html
  } else if (footer?.openingHours?.html) {
    // Strip h3 tags from footer content and wrap everything in consistent h3
    const hoursText = footer.openingHours.html.replace(/<\/?h3>/g, '')
    bannerContent = `<h3>${openingHoursLabel}: ${hoursText}</h3>`
  }

  return (
    <div className='banner' id='banner'>
      {isSearchPage ? (
        <input
          ref={searchInputRef}
          onChange={e => update(e.target.value)}
          type='text'
          className='search-input'
          autoFocus
          placeholder={
            ctx.lang === 'is'
              ? 'Sláðu inn leitartexta ( t.d. nafn á sýningu eða listamanni) '
              : 'Type in keyword (title/artist etc.)'
          }
        />
      ) : (
        bannerContent && (
          <div
            dangerouslySetInnerHTML={{
              __html: bannerContent,
            }}
            className='banner__marquee center'
          />
        )
      )}
      <div className='d-flex justify-content-end '>
        <SearchButton lang={ctx.lang} />
        <LanguageButton page={ctx} />
      </div>
    </div>
  )
}

export default Banner
