import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext<{
  searchQuery: string
  update: (s: string) => void
}>({
  searchQuery: '',
  update() {},
})

const SearchProvider: React.FC = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const update = (s: string) => setSearchQuery(s)
  return (
    <SearchContext.Provider value={{ searchQuery, update }}>
      {children}
    </SearchContext.Provider>
  )
}

const useSearch = () => useContext(SearchContext)

export { SearchProvider, useSearch }
