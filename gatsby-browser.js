import './src/styles/nylo.scss'
import { LanguageProvider } from '~/context/langContext'
import React from 'react'
import { SecondaryNavbarContextProvider } from '~/context/secNavContext'
import { BackgroundContextProvider } from '~/context/backgroundContext'
import { MobileMenuContextProvider } from '~/context/mobileMenuContext'

export const wrapRootElement = ({ element }) => (
  <MobileMenuContextProvider>
    <BackgroundContextProvider>
      <SecondaryNavbarContextProvider>
        <LanguageProvider>{element}</LanguageProvider>
      </SecondaryNavbarContextProvider>
    </BackgroundContextProvider>
  </MobileMenuContextProvider>
)
