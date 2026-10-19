import React from 'react'
import { InstantSearch, connectSearchBox, Hits } from 'react-instantsearch-dom'
import algoliaSearch from 'algoliasearch/lite'

// custom components
import { CustomInput, CustomResult } from './CustomComponents'

const appId = process.env.GATSBY_ALGOLIA_APP_ID || ''
// Search-only key. Never put the indexing/admin key in a GATSBY_ var:
// Gatsby inlines GATSBY_* values into the public JS bundle.
const apiKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY || ''
const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME || ''

const searchClient = algoliaSearch(appId, apiKey)

const SearchInput = connectSearchBox(CustomInput)

const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div className='search col-lg-8 pl-0'>
        <SearchInput />
        <Hits hitComponent={CustomResult} />
      </div>
    </InstantSearch>
  )
}

export default Search
