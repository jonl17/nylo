import React from 'react'
import { Exit } from './SVG'
import cn from 'classnames'
import { navigate } from 'gatsby'

interface Props {
  className?: string
  goTo?: () => void
  [propName: string]: unknown
}

const handleClick = () => {
  if (
    // has a prev location that is on this domain
    window.history.length > 1 &&
    document.referrer.indexOf(window.location.host) !== -1
  ) {
    navigate(-1)
  } else {
    navigate('/')
  }
}

const CloseButton = ({ className = '', goTo = handleClick }: Props) => {
  return (
    <button
      onClick={() => goTo()}
      className='icon__exit removeGenericButtonStyles'
    >
      <Exit className={cn('icon', className)} />
    </button>
  )
}

export default CloseButton
