import React from 'react'

const Burger = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} className='burger removeGenericButtonStyles p-0'>
      <div className='burger'>
        <span className='burger__line'></span>
        <span className='burger__line'></span>
        <span className='burger__line'></span>
      </div>
    </button>
  )
}

export default Burger
