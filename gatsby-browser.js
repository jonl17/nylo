import './src/styles/nylo.scss'
import { LanguageProvider } from '~/context/langContext'
import React from 'react'
import { SecondaryNavbarContextProvider } from '~/context/secNavContext'
import { BackgroundContextProvider } from '~/context/backgroundContext'
import { MobileMenuContextProvider } from '~/context/mobileMenuContext'
import { SearchProvider } from '~/context/searchContext'
import { ExhibitionFilterProvider } from '~/context/exhibitionFilter'

export const wrapRootElement = ({ element }) => (
  <MobileMenuContextProvider>
    <BackgroundContextProvider>
      <SecondaryNavbarContextProvider>
        <LanguageProvider>
          <SearchProvider>
            <ExhibitionFilterProvider>{element} </ExhibitionFilterProvider>
          </SearchProvider>
        </LanguageProvider>
      </SecondaryNavbarContextProvider>
    </BackgroundContextProvider>
  </MobileMenuContextProvider>
)
