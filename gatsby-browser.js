import './src/styles/nylo.scss'
import { LanguageProvider } from '~/context/langContext'
import React from 'react'
import { SecondaryNavbarContextProvider } from '~/context/secNavContext'
import { BackgroundContextProvider } from '~/context/backgroundContext'
import { MobileMenuContextProvider } from '~/context/mobileMenuContext'
import { SearchProvider } from '~/context/searchContext'
import { ExhibitionFilterProvider } from '~/context/exhibitionFilter'
import { loadGtm, readConsent } from '~/utils/consent'

// Cookie consent (T-16): load GTM on page load only if the visitor accepted.
// onClientEntry runs once per full page load, not on route changes.
export const onClientEntry = () => {
  if (readConsent() === 'accepted') loadGtm()
}

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
