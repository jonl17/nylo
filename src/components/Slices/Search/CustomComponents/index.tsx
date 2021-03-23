import React from 'react'
import { Link } from 'gatsby'
import { Highlight } from 'react-instantsearch-dom'

const CustomInput = ({
  currentRefinement,
  refine,
}: {
  currentRefinement: string
  refine: (s: string) => void
}) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <input
        autoFocus
        placeholder='Search me'
        type='text'
        className='input'
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
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
  }
}

const CustomResult = ({ hit }: ResultProps) => {
  const { title, artist, curator, objectID, url } = hit
  return (
    <div className='my-4 search-results'>
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
