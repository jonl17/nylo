import React, { createContext, useContext, useState } from 'react'

const ExhibitionFilterContext = createContext<{
  filter: string
  updateFilter: (f: string) => void
  loadMore: number
  updateLoadMore: () => void
}>({ filter: 'Current', updateFilter() {}, loadMore: 20, updateLoadMore() {} })

const LOAD_MORE_LIMIT = 20

const ExhibitionFilterProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = useState('Current')
  const updateFilter = (f: string) => setFilter(f)

  const [loadMore, setLoadMore] = useState(LOAD_MORE_LIMIT)
  const updateLoadMore = () => setLoadMore(prev => prev + LOAD_MORE_LIMIT)

  return (
    <ExhibitionFilterContext.Provider
      value={{ filter, updateFilter, loadMore, updateLoadMore }}
    >
      {children}
    </ExhibitionFilterContext.Provider>
  )
}

const useExhibitionFilter = () => useContext(ExhibitionFilterContext)

export { ExhibitionFilterProvider, useExhibitionFilter }
