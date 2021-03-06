import React, { createContext, useContext, useState } from 'react'
import { Language } from '~/lang'

const LanguageContext = createContext<{
  lang: Language
  modify(lang: Language): void
}>({
  lang: 'is',
  modify() {},
})

const useLanguage = () => useContext(LanguageContext)

const LanguageProvider: React.FC = ({ children }) => {
  const [lang, setLang] = useState<Language>('is')

  const modify = (lang: Language) => setLang(lang)

  return (
    <LanguageContext.Provider value={{ lang, modify }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageProvider, useLanguage }
