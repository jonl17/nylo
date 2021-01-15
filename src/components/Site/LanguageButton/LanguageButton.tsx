import React, { useContext } from 'react'
import Button from '~/components/Site/Button'
import { LanguageContext } from '~/context/LanguageContext'

const LanguageButton = () => {
  const { modify, lang } = useContext(LanguageContext)
  return (
    <Button
      className='btn__language'
      label={lang === 'is' ? 'ENG' : 'ÍSL'}
      onClick={() => modify()}
    ></Button>
  )
}

export default LanguageButton
