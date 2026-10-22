import './src/styles/nylo.scss'
import { loadGtm, readConsent } from '~/utils/consent'

// Shared with gatsby-ssr.js so server HTML and the first client render match
// (prevents React hydration errors #418/#423).
export { wrapRootElement } from './src/wrapRootElement'

// Cookie consent (T-16): load GTM on page load only if the visitor accepted.
// onClientEntry runs once per full page load, not on route changes.
export const onClientEntry = () => {
  if (readConsent() === 'accepted') loadGtm()
}
