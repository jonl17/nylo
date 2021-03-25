import './src/styles/nylo.scss'
import { LanguageProvider } from '~/context/langContext'
import React from 'react'
import { SecondaryNavbarContextProvider } from '~/context/secNavContext'
import { BackgroundContextProvider } from '~/context/backgroundContext'
import { MobileMenuContextProvider } from '~/context/mobileMenuContext'
import { SearchProvider } from '~/context/searchContext'

export const wrapRootElement = ({ element }) => (
  <MobileMenuContextProvider>
    <BackgroundContextProvider>
      <SecondaryNavbarContextProvider>
        <LanguageProvider>
          <SearchProvider>{element}</SearchProvider>
        </LanguageProvider>
      </SecondaryNavbarContextProvider>
    </BackgroundContextProvider>
  </MobileMenuContextProvider>
)
