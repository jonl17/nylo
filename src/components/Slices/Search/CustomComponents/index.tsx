import React, { useEffect } from 'react'
import { Language } from '~/lang'
import { useSearch } from '~/context/searchContext'
import { useLocation } from '@reach/router'
import { PageHit, ExhibitionHit, EventHit } from './Types'
import { useLanguage } from '~/context/langContext'
import useGetCurrentLanguage from '~/hooks/useGetCurrentLanguage'

const CustomInput = ({ refine }: { refine: (s: string) => void }) => {
  const { searchQuery } = useSearch()

  const { lang } = useLanguage()

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
  const { type, lang } = hit
  const l = useGetCurrentLanguage()

  if (type === 'page') {
    return l === lang && <PageHit hit={hit} />
  } else if (type === 'exhibition') {
    return l === lang && <ExhibitionHit hit={hit} />
  } else return l === lang && <EventHit hit={hit} />
}

export { CustomInput, CustomResult }
