const React = require('react')

// Cookie consent (T-16): Google Tag Manager is NOT added to the static HTML.
// It is injected in the browser only after the visitor accepts (see
// src/utils/consent.ts and gatsby-browser.js). There is no <noscript> GTM
// iframe on purpose: without JavaScript there is no consent, so no tracking.
//
// This tiny inline script only hides the consent bar before first paint when a
// valid choice (max ~6 months old) is already stored. It loads nothing.
const CONSENT_KEY = 'nylo-cookie-consent'
const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key='cookie-consent-state'
      dangerouslySetInnerHTML={{
        __html: `try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}'));if(c&&c.ts&&Date.now()-c.ts<${CONSENT_MAX_AGE_MS})document.documentElement.classList.add('cookie-consent-set')}catch(e){}`,
      }}
    />,
  ])
}
