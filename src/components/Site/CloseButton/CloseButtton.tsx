import React from 'react'
import { Exit } from './SVG'
import cn from 'classnames'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { useLanguage } from '~/context/LanguageContext'

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

  console.log(state)

  const { lang } = useLanguage()

  const handleClick = () => {
    if (state) {
      navigate(-1)
    } else {
      navigate(lang === 'en-us' ? '/en' : '/')
    }
  }

  return (
    <button
      onClick={() => handleClick()}
      className='icon__exit removeGenericButtonStyles'
    >
      <Exit className={cn('icon', className)} />
    </button>
  )
}

export default CloseButton
