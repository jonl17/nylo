import React, { createContext, useState } from 'react'
import { translations } from '~/lang'

const LanguageContext = createContext<{
  lang: string
  modify(): void
  langSeek(s: string[]): string
}>({
  lang: 'is',
  modify() {},
  langSeek() {
    return ''
  },
})

const LanguageProvider: React.FC = ({ children }) => {
  const [lang, setLang] = useState<'is' | 'en-us'>('is')

  const modify = () => {
    setLang(prev => (prev === 'is' ? 'en-us' : 'is'))
  }

  const langSeek = (keys: string[]) => {
    console.log('language')
    return 'Bob'
  }

  return (
    <LanguageContext.Provider value={{ lang, modify, langSeek }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageProvider }
