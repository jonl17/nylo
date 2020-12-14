import React from 'react'
import { Exit } from './SVG'
import cn from 'classnames'
import { navigate } from 'gatsby'
interface Props {
  className?: string
  [propName: string]: unknown
}

const CloseButton = ({ className = '' }: Props) => {
  return (
    <button
      onClick={() => navigate(-1)}
      className='icon__exit removeGenericButtonStyles'
    >
      <Exit className={cn('icon', className)} />
    </button>
  )
}

export default CloseButton
