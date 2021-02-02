import React, { createContext, useState } from 'react'
import { Language } from '~/lang'

const LanguageContext = createContext<{
  lang: Language
  modify(): void
}>({
  lang: 'is',
  modify() {},
})

const LanguageProvider: React.FC = ({ children }) => {
  const [lang, setLang] = useState<Language>('is')

  const modify = () => {
    setLang(prev => (prev === 'is' ? 'en' : 'is'))
  }

  return (
    <LanguageContext.Provider value={{ lang, modify }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageProvider }
