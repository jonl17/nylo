import React from 'react'
import { Link } from 'gatsby'

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
    data: {
      title: {
        text: string
      }
      excerpt: {
        html: string
      }
      artist: string
      curator: string
    }
  }
}

const CustomResult = ({ hit }: ResultProps) => {
  const {
    data: { title, artist, curator, excerpt },
    objectID,
  } = hit
  return (
    <div className='my-4'>
      <Link to={objectID}>
        <h3>{title.text}</h3>
        <p>Listamenn: {artist}</p>
        {curator && <p>Sýningastjóri: {curator}</p>}
        <div dangerouslySetInnerHTML={{ __html: excerpt.html }} />
      </Link>
    </div>
  )
}

export { CustomInput, CustomResult }
