import React, { useContext } from 'react'
import ButtonLink from '~/components/Site/ButtonLink'
import { LanguageContext } from '~/context/LanguageContext'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'

const LanguageButton = () => {
  const { modify, lang } = useContext(LanguageContext)
  const { pathname } = useLocation()
  return (
    <ButtonLink
      className='btn__language'
      label={lang === 'is' ? 'ENG' : 'ÍSL'}
      to={lang === 'is' ? '/en/' : '/'}
    ></ButtonLink>
  )
}

export default LanguageButton
