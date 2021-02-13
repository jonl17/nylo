import React, { useContext } from 'react'
import cn from 'classnames'
import { langSeek } from 'balkan-tungumal'
import { LanguageContext } from '~/context/LanguageContext'

const Open = ({ className = '' }) => {
  const { lang } = useContext(LanguageContext)
  return (
    <p className={cn(className, 'open')}>
      {langSeek('Open', lang)?.toUpperCase()}
    </p>
  )
}

export default Open
