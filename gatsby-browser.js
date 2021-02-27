import './src/styles/nylo.scss'
import { LanguageProvider } from '~/context/LanguageContext'
import React from 'react'
import { SecondaryNavbarContextProvider } from '~/context/secNavContext'
import { BackgroundContextProvider } from '~/context/backgroundContext'

export const wrapRootElement = ({ element }) => (
  <BackgroundContextProvider>
    <SecondaryNavbarContextProvider>
      <LanguageProvider>{element}</LanguageProvider>
    </SecondaryNavbarContextProvider>
  </BackgroundContextProvider>
)
