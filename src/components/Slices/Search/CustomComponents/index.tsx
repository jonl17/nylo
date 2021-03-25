import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { Highlight } from 'react-instantsearch-dom'
import { Language } from '~/lang'
import { useSearch } from '~/context/searchContext'
import { useLanguage } from '~/context/langContext'

const CustomInput = ({ refine }: { refine: (s: string) => void }) => {
  const { searchQuery } = useSearch()

  useEffect(() => {
    refine(searchQuery)
  }, [searchQuery])

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <input
        hidden
        autoFocus
        placeholder='Search me'
        type='text'
        className='input'
      />
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
  }
}

const CustomResult = ({ hit }: ResultProps) => {
  const { artist, curator, url, lang } = hit

  return (
    <div className='search-results mb-4'>
      <Link to={url}>
        <h3>
          <Highlight attribute='title' hit={hit} />
        </h3>
        {artist && (
          <p>
            <span className='pr-1'>Listamenn:</span>
            <Highlight attribute='artist' hit={hit} />
          </p>
        )}
        {curator && (
          <p>
            <span className='pr-1'>Sýningastjóri:</span>
            <Highlight attribute='curator' hit={hit} />
          </p>
        )}
      </Link>
    </div>
  )
}

export { CustomInput, CustomResult }
