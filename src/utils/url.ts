import { useMemo } from 'react'
import { useLocation } from '@reach/router'
import qs from 'qs'
import { navigate } from 'gatsby'

export const useQueryParams = () => {
  const { search } = useLocation()
  return useMemo(() => qs.parse(search.substring(1)), [search])
}

export const mergeQueryParams = (newParams: {
  [k: string]: string | undefined
}): void => {
  const params = qs.parse(window.location.search.substring(1))
  const s = qs.stringify({ ...params, ...newParams })
  navigate(window.location.pathname + (s && '?' + s), { replace: true })
}
