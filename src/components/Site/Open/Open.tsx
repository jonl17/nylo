import React from 'react'
import cn from 'classnames'
import { langSeek } from 'balkan-tungumal'
import { useLanguage } from '~/context/langContext'

const Open = ({ className = '' }) => {
  const { lang } = useLanguage()
  return (
    <p className={cn(className, 'open')}>
      {langSeek('Open', lang)?.toUpperCase()}
    </p>
  )
}

export default Open
