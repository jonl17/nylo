import React, { useEffect } from 'react'
import { Language } from '~/lang'
import { useSearch } from '~/context/searchContext'
import { useLocation } from '@reach/router'
import { PageHit, ExhibitionHit, EventHit } from './Types'
import { useLanguage } from '~/context/langContext'

const CustomInput = ({ refine }: { refine: (s: string) => void }) => {
  const { searchQuery } = useSearch()

  const { lang } = useLanguage()

  console.log(lang)

  useEffect(() => {
    refine(searchQuery)
  }, [searchQuery])

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <input hidden autoFocus type='text' className='input' />
    </form>
  )
}

interface ResultProps {
  hit: {
    objectID: string
    title: string
    artist: string
    curator: string
    url: string
    lang: Language
    type: string
    date: string
  }
}

const CustomResult = ({ hit }: ResultProps) => {
  const { artist, curator, url, date, type, lang } = hit
  const { pathname } = useLocation()

  const language: Language = pathname.includes('/' + lang) ? 'en-us' : 'is'

  if (type === 'page') {
    return <PageHit hit={hit} lang={language} />
  } else if (type === 'exhibition') {
    return <ExhibitionHit hit={hit} lang={language} />
  } else return <EventHit hit={hit} />
}

export { CustomInput, CustomResult }
