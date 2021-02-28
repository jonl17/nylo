import React from 'react'
import cn from 'classnames'

const Burger = ({
  onClick,
  expand,
}: {
  onClick: () => void
  expand: boolean
}) => {
  return (
    <button
      onClick={onClick}
      className={cn('burger removeGenericButtonStyles p-0')}
    >
      <div
        className={cn('burger__line-wrap', {
          'burger__line-wrap--ex': expand,
        })}
      >
        <span
          className={cn('burger__line', {
            'd-none': expand,
          })}
        ></span>
        <span
          className={cn('burger__line', {
            'ex-line ex-line--one': expand,
          })}
        ></span>
        <span
          className={cn('burger__line', {
            'ex-line ex-line--two': expand,
          })}
        ></span>
      </div>
    </button>
  )
}

export default Burger
