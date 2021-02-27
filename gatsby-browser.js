import './src/styles/nylo.scss'
import { LanguageProvider } from '~/context/LanguageContext'
import React from 'react'
import { SecondaryNavbarContextProvider } from '~/context/secNavContext'

export const wrapRootElement = ({ element }) => (
  <SecondaryNavbarContextProvider>
    <LanguageProvider>{element}</LanguageProvider>
  </SecondaryNavbarContextProvider>
)
