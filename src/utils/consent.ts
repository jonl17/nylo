// Cookie consent for nylo.is (T-16).
// Google Tag Manager is only loaded after the visitor accepts. The choice is
// kept in localStorage with a timestamp and expires after about 6 months.

export const GTM_ID = process.env.GATSBY_GTM_ID || 'GTM-5R8KWLDS'
export const CONSENT_KEY = 'nylo-cookie-consent'
export const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182 // ~6 months
export const OPEN_CONSENT_EVENT = 'nylo:open-cookie-consent'

export type ConsentValue = 'accepted' | 'declined'

interface StoredConsent {
  value: ConsentValue
  ts: number
}

export const readConsent = (): ConsentValue | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed: StoredConsent = JSON.parse(raw)
    if (
      (parsed.value !== 'accepted' && parsed.value !== 'declined') ||
      typeof parsed.ts !== 'number' ||
      Date.now() - parsed.ts > CONSENT_MAX_AGE_MS
    ) {
      window.localStorage.removeItem(CONSENT_KEY)
      return null
    }
    return parsed.value
  } catch {
    return null
  }
}

export const writeConsent = (value: ConsentValue) => {
  try {
    const stored: StoredConsent = { value, ts: Date.now() }
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(stored))
  } catch {
    // Storage blocked: the choice only lasts for this page view.
  }
  document.documentElement.classList.add('cookie-consent-set')
}

// Injects GTM once per page load. Gatsby route changes don't reload the page,
// so the guard keeps it from being added twice.
export const loadGtm = () => {
  if (typeof window === 'undefined' || !GTM_ID) return
  const w = window as any
  if (w.__nyloGtmLoaded || document.getElementById('gtm-script')) return
  w.__nyloGtmLoaded = true
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.id = 'gtm-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}

// Removes Google Analytics cookies set on this domain (used on decline).
export const clearAnalyticsCookies = () => {
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`]
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim()
    if (!/^(_ga|_gid|_gat)/.test(name)) return
    domains.forEach(domain => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ''
      }`
    })
  })
}

export const openConsentBanner = () => {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
