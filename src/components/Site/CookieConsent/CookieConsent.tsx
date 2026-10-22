import React, { useEffect, useRef, useState } from 'react'
import { Language } from '~/lang'
import {
  clearAnalyticsCookies,
  loadGtm,
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
} from '~/utils/consent'

const text = {
  is: {
    label: 'Vafrakökur',
    message:
      'Við notum vafrakökur til að greina umferð um vefinn, en aðeins ef þú samþykkir.',
    accept: 'Samþykkja',
    decline: 'Hafna',
  },
  'en-us': {
    label: 'Cookies',
    message:
      'We use cookies to analyse traffic on this site, but only if you accept.',
    accept: 'Accept',
    decline: 'Decline',
  },
}

// Rendered visible in the static HTML so first-time visitors see it at once.
// A small inline script in gatsby-ssr.js hides it before paint when a valid
// choice is already stored (html.cookie-consent-set).
const CookieConsent = ({ lang }: { lang: Language }) => {
  const t = text[lang] || text.is
  const [open, setOpen] = useState(true)
  const [reopened, setReopened] = useState(false)
  const acceptRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (readConsent() !== null) setOpen(false)
    else document.documentElement.classList.remove('cookie-consent-set')

    const reopen = () => {
      setReopened(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  useEffect(() => {
    if (open && reopened) acceptRef.current?.focus()
  }, [open, reopened])

  // Lock page scroll while the shaded backdrop is up; the choice is explicit.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('cookie-consent-lock', open)
    return () => root.classList.remove('cookie-consent-lock')
  }, [open])

  const choose = (accepted: boolean) => {
    const previous = readConsent()
    writeConsent(accepted ? 'accepted' : 'declined')
    setOpen(false)
    setReopened(false)
    if (accepted) {
      loadGtm()
    } else {
      clearAnalyticsCookies()
      // GTM can't be unloaded from a running page, so reload without it.
      if (previous === 'accepted') window.location.reload()
    }
  }

  if (!open) return null

  const openClass = reopened ? ' cookie-consent--open' : ''

  return (
    <>
      {/* Soft shade behind the bar. Not clickable to dismiss. */}
      <div
        className={`cookie-consent-backdrop${openClass}`}
        aria-hidden='true'
      />
      <div
        className={`cookie-consent${openClass}`}
        role='region'
        aria-label={t.label}
        lang={lang === 'en-us' ? 'en' : 'is'}
      >
        <p className='cookie-consent__text'>{t.message}</p>
        <div className='cookie-consent__buttons'>
          <button
            ref={acceptRef}
            type='button'
            className='btn btn--primary cookie-consent__btn'
            onClick={() => choose(true)}
          >
            {t.accept}
          </button>
          <button
            type='button'
            className='btn btn--primary cookie-consent__btn'
            onClick={() => choose(false)}
          >
            {t.decline}
          </button>
        </div>
      </div>
    </>
  )
}

export default CookieConsent
