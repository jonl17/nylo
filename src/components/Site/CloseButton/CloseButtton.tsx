import React from 'react'
import { Exit } from './SVG'
import cn from 'classnames'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'

interface Props {
  className?: string
  goTo?: () => void
  [propName: string]: unknown
}

const CloseButton = ({ className = '', goTo }: Props) => {
  const { state } = useLocation() as {
    state: {
      referrer?: string
    }
  }

  const handleClick = () => {
    if (state && state.referrer) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <button
      onClick={goTo ? () => goTo() : () => handleClick()}
      className='icon__exit removeGenericButtonStyles'
    >
      <Exit className={cn('icon', className)} />
    </button>
  )
}

export default CloseButton
