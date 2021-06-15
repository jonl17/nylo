import React, { useMemo, useState } from 'react'
import qs from 'qs'
import { useLocation } from '@reach/router'

export default () => {
  const { pathname } = useLocation()
  const [lang, setLang] = useState('is')
  useMemo(() => {
    setLang(pathname.includes('/en-us') ? 'en-us' : 'is')
  }, [pathname])
  return lang
}
