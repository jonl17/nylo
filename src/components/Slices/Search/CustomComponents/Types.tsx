import React from 'react'
import { Highlight } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import cn from 'classnames'
import { Language } from '~/lang'
import { langSeek } from 'balkan-tungumal'
import { formatDate } from '~/utils'

type PageHitProps = {
  hit: {
    url: string
    lang: Language
  }
  lang: Language
}

const PageHit = ({ hit, lang }: PageHitProps) => {
  return (
    <div className={cn('search-results mb-4')}>
      {/* <p>{langSeek('page', lang)}</p> */}
      <Link to={hit.url}>
        <h3>
          <Highlight attribute='title' hit={hit} />
        </h3>
      </Link>
    </div>
  )
}

type ExhibitionHitProps = {
  hit: {
    url: string
    artist: string
    curator: string
    lang: Language
  }
  lang: Language
}

const ExhibitionHit = ({ hit, lang }: ExhibitionHitProps) => {
  return (
    <div className={cn('search-results mb-4')}>
      {/* <p>{langSeek('exhibition', lang)}</p> */}
      <Link to={hit.url}>
        <h3>
          <Highlight attribute='title' hit={hit} />
        </h3>
        {hit.artist && (
          <p>
            <span className='pr-1'>Listamenn:</span>
            <Highlight attribute='artist' hit={hit} />
          </p>
        )}
        {hit.curator && (
          <p>
            <span className='pr-1'>Sýningastjóri:</span>
            <Highlight attribute='curator' hit={hit} />
          </p>
        )}
      </Link>
    </div>
  )
}

type EventHitProps = {
  hit: {
    url: string
    title: string
    date: string
  }
}

const EventHit = ({ hit }: EventHitProps) => {
  return (
    <div className={cn('search-results mb-4')}>
      {/* <p>{langSeek('exhibition', lang)}</p> */}
      <p>{formatDate(hit.date)}</p>
      <Link to={hit.url}>
        <h3>
          <Highlight attribute='title' hit={hit} />
        </h3>
      </Link>
    </div>
  )
}

export { PageHit, ExhibitionHit, EventHit }
