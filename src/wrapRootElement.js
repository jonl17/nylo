import React from 'react'
import { LanguageProvider } from '~/context/langContext'
import { SecondaryNavbarContextProvider } from '~/context/secNavContext'
import { BackgroundContextProvider } from '~/context/backgroundContext'
import { MobileMenuContextProvider } from '~/context/mobileMenuContext'
import { SearchProvider } from '~/context/searchContext'
import { ExhibitionFilterProvider } from '~/context/exhibitionFilter'

// Shared by gatsby-browser.js and gatsby-ssr.js so the server HTML and the
// first client render have the same tree (otherwise React hydration fails,
// errors #418/#423).
export const wrapRootElement = ({ element }) => (
  <MobileMenuContextProvider>
    <BackgroundContextProvider>
      <SecondaryNavbarContextProvider>
        <LanguageProvider>
          <SearchProvider>
            <ExhibitionFilterProvider>{element}</ExhibitionFilterProvider>
          </SearchProvider>
        </LanguageProvider>
      </SecondaryNavbarContextProvider>
    </BackgroundContextProvider>
  </MobileMenuContextProvider>
)
