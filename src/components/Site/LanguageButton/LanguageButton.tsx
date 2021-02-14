import React, { useContext } from 'react'
import ButtonLink from '~/components/Site/ButtonLink'
import { LanguageContext } from '~/context/LanguageContext'

const LanguageButton = () => {
  const { lang } = useContext(LanguageContext)
  return (
    <ButtonLink
      className='btn__language'
      label={lang === 'is' ? 'ENG' : 'ÍSL'}
      to={lang === 'is' ? '/en' : '/'}
    ></ButtonLink>
  )
}

export default LanguageButton
