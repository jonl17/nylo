import React, { useContext } from 'react'
import Button from '~/components/Site/Button'
import { LanguageContext } from '~/context/LanguageContext'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'

const LanguageButton = () => {
  const { modify, lang } = useContext(LanguageContext)
  const { pathname } = useLocation()
  return (
    <Button
      className='btn__language'
      label={lang === 'is' ? 'ENG' : 'ÍSL'}
      onClick={() => {
        navigate(lang === 'is' ? '/en' : '/')
        modify()
      }}
    ></Button>
  )
}

export default LanguageButton
