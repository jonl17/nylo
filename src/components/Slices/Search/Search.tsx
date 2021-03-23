import React from 'react'
import { InstantSearch, connectSearchBox, Hits } from 'react-instantsearch-dom'
import algoliaSearch from 'algoliasearch/lite'

// custom components
import { CustomInput, CustomResult } from './CustomComponents'

const appId = process.env.ALGOLIA_APP_ID || ''
const apiKey = process.env.ALGOLIA_API_KEY || ''

const searchClient = algoliaSearch(appId, apiKey)

const SearchInput = connectSearchBox(CustomInput)

const Search = () => {
  console.log('appID:', appId)
  return (
    <InstantSearch searchClient={searchClient} indexName='exhibition'>
      <div className='search col-lg-8'>
        <SearchInput />
        <Hits hitComponent={CustomResult} />
      </div>
    </InstantSearch>
  )
}

export default Search
