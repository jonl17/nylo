import React from 'react'

const FilterByText = ({
  updateQuery,
}: {
  updateQuery: (text: string) => void
}) => {
  return (
    <div className='mb-lg-2 mb-3 input'>
      <input
        onChange={e => updateQuery(e.target.value)}
        className='p-1'
        placeholder='Leitaðu nú...'
      />
    </div>
  )
}

export default FilterByText
